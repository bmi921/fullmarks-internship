# ゆるキャラクイズとは
株式会社fullmarksの2025年サマーインターンで製作されたゆるキャラクイズアプリです。  
250を超えるゆるキャラの名前、出身県を当てるクイズになっています。  
ゆるキャラグランプリの投票にお役立てください。  

<img width="1200" height="630" alt="Frame 1" src="https://github.com/user-attachments/assets/faaf6ced-6753-4ce3-a49c-92a2430fff6d" />

# 機能
- 出題範囲を都道府県単位で決められます。
- 上級者向けに画像をぼやかして表示する隠し画像モードもあります。
- クイズの回答を元に正答率をXでシェアできます。
- Geminiが公式の自己紹介文を元にヒントを出す機能があります。個人で使われる方は/src/app/environmentディレクトリからgeminiのAPIKEYを設定してください。
- 回答履歴、出題範囲などはブラウザのローカルストレージに保存されます。
- AngularJSで動作するシンプルな構成のアプリです。

<img width="426" height="772" alt="スクリーンショット 2025-09-12 11 48 44" src="https://github.com/user-attachments/assets/79fda8c2-b297-4f43-8fd9-053a20c4f669" />
<img width="1164" height="888" alt="スクリーンショット 2025-09-12 11 51 18" src="https://github.com/user-attachments/assets/91149605-5ceb-4587-87f7-9ed4fe603412" />

# For developper


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.  
github pagesにdeployするときは、`npm run build`で`dist/yuruchara-quiz`ディレクトリをpublicに置いてあげる。

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
