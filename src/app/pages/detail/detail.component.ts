import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CoreService } from 'src/app/shared/services/core.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Photos } from 'src/app/shared/model/photo.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  itemForm: FormGroup;
  previewImg: SafeUrl;
  updateState: boolean = false;
  stateName: string;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private coreService: CoreService,
              private location: Location, public snackBar: MatSnackBar) {
    this.initForm();

  }

  initForm(){
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    this.itemForm = this.fb.group({
      albumId: ['', Validators.required],
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(urlRegex)]],
      thumbnailUrl: ['', Validators.required],
      id: ['']

    });
  }

  ngOnInit(): void {
    this.coreService.itemObservable.subscribe(data => {
      this.initForm();
      this.updateState = true;
      this.itemForm.get('albumId').setValue(data.albumId);
      this.itemForm.get('title').setValue(data.title);
      this.itemForm.get('url').setValue(data.url);
      this.itemForm.get('thumbnailUrl').setValue(data.thumbnailUrl);
      this.itemForm.get('id').setValue(data.id);
      this.previewImg = data.thumbnailUrl;
    })

    this.coreService.stateObservable.subscribe(data => {
      this.updateState = data;
      if (this.updateState) this.stateName = 'Update';
      else this.stateName = 'Add';
    })
  }

  onFileChange(event) {
    this.itemForm.controls['thumbnailUrl'].setValue(event.target.files[0].name);
    this.imagePreview(event.target.files[0]);
  }

  imagePreview(file) {
    this.previewImg = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
  }

  update() {
    document.getElementById('mainDocument').click();
  }


  onSubmit(item) {

    if(!this.updateState){
      console.log('update state', this.updateState)
      this.coreService.saveItem(item).subscribe(result => {
        this.updateList();
      })
    } else {
      console.log('update state', this.updateState)
      this.coreService.updateItem(item).subscribe(result => {
        this.updateList();
      })
    }
  }

  updateList() {
    this.location.back();
    this.snackBar.open('item was saved correctly', 'close', {
         duration: 6000,
         verticalPosition: 'top',
         horizontalPosition: 'end'
    });
  }

}
