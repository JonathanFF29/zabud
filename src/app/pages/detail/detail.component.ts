import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CoreService } from 'src/app/shared/services/core.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  itemForm: FormGroup;
  previewImg: SafeUrl;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private coreService: CoreService,
              private location: Location, public snackBar: MatSnackBar) {

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


  onSubmit(post) {
    console.log('value group form', post)
    this.coreService.saveItem(post).subscribe(result => {
      this.updateList();
    })
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
