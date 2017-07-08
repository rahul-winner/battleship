import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShipService } from './ships/ships.service';
import { MarkDirective } from './core/mark.directive';

@NgModule({
  declarations: [
    AppComponent,
    MarkDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ShipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
