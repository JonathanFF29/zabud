import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  itemForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      albumId: ['', Validators.required],
      title: ['', Validators.required],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
      id: ['']

    });

  }

  ngOnInit(): void {
  }

  onSubmit(post) {
   console.log('value group form', post)
  }

}
