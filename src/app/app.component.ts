import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-web-sample';
}

const characters = [
  {
    name: 'くまモン',
    prefecture: '熊本県',
    organization: '熊本県',
    imagePath: '/assets/images/kumamon.png',
  },
  {
    name: 'ひこにゃん',
    prefecture: '滋賀県',
    organization: '彦根市',
    imagePath: '/assets/images/hikonyan.png',
  },
];
