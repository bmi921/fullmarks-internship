import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [ConfirmComponent], // ConfirmComponent を宣言
  imports: [CommonModule, ModalModule.forRoot()], // BsModalService 用
  exports: [ConfirmComponent], // 他で使う場合に必要
})
export class ConfirmModule {}
