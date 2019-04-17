import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { FlexLayoutModule } from '@angular/flex-layout'
import {HttpClientModule}  from '@angular/common/http';
import { MaterialModule } from './material.module'
import { NgModule } from '@angular/core';
import { TestComponent } from './test/test.component';
import { WeatherComponent } from './Weather/weather.component';
import { WeatherService } from './weather.service';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserAnimationsModule,

  ],
  providers: [WeatherService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
