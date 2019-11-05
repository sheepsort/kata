import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WageCalculatorService } from './services/wage-calculator.service';
import { HourCalculatorService } from './services/hour-calculator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WageCalculatorService, HourCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
