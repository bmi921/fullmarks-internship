import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  show(isCorrect: boolean, correctAnswer?: string): BsModalRef | undefined {
    const initialState = {
      isCorrect: isCorrect,
      correctAnswer: correctAnswer,
    };
    this.bsModalRef = this.modalService.show(ConfirmComponent, {
      initialState,
    });
    return this.bsModalRef;
  }
}
