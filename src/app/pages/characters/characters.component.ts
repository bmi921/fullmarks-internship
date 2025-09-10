import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/character.model';
import { DataService } from '../../shared/data.service';
import { ProfileService } from '../../shared/modal/profile.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;
  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';
  prefectures: string[] = [];
  selectedPrefecture: string = 'すべて';

  constructor(
    private dataService: DataService,
    private profileService: ProfileService
  ) {
    this.characters$ = this.dataService.getCharacters();
  }

  ngOnInit(): void {
    this.characters$.subscribe(characters => {
      this.allCharacters = characters;
      this.filteredCharacters = characters;
      this.prefectures = [
        'すべて',
        ...new Set(characters.map(c => c.prefecture)),
      ];
    });
  }

  search(): void {
    let tempCharacters = this.allCharacters;

    if (this.selectedPrefecture && this.selectedPrefecture !== 'すべて') {
      tempCharacters = tempCharacters.filter(
        character => character.prefecture === this.selectedPrefecture
      );
    }

    if (this.searchTerm) {
      tempCharacters = tempCharacters.filter(character =>
        character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    this.filteredCharacters = tempCharacters;
  }

  showProfile(character: Character): void {
    this.profileService.open(character);
  }
}
