import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProfileComponent } from './profile/profile.component';
import { Character } from 'src/app/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  bsModalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {}

  open(character: Character): BsModalRef | undefined {
    const initialState = {
      character: character,
    };
    this.bsModalRef = this.modalService.show(ProfileComponent, {
      initialState,
    });
    return this.bsModalRef;
  }
}
