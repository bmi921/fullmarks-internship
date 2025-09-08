import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    NgbModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


