import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent], // ProfileComponent を宣言
  imports: [CommonModule, ModalModule.forRoot()], // BsModalService 用
  exports: [ProfileComponent], // 他で使う場合に必要
})
export class ProfileModule {}
