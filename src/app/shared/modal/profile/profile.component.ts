import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Character } from 'src/app/models/character.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  character?: Character;

  constructor(public bsModalRef: BsModalRef) {}
}
