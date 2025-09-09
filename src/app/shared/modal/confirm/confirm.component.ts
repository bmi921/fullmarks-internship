import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent implements OnInit {
  isCorrect?: boolean;
  correctAnswer?: string;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    setTimeout(() => this.bsModalRef.hide(), 1000);
  }
}
