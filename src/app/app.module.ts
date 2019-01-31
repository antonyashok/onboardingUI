import {ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegiesterComponent } from './regiester/app.regiester.component';
import { GridComponent } from './grid/app.grid.component';
import { HeaderComponent } from './header/app.header';

import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { HttpClient } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { OnboardingDetailsService } from './grid/app.grid.onboardingDetails.service';
import { OnboardingDetailsRegiesterService } from './regiester/app.regiester.component.service';
import { NumberOnlyDirective } from './core/number.directive';
import { DisableControlDirective } from './core/disableControl.directive';

@NgModule({
    imports:      [ BrowserModule,  BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
    ],
    declarations: [ AppComponent, RegiesterComponent , GridComponent, HeaderComponent, NumberOnlyDirective, DisableControlDirective],
    providers: [ OnboardingDetailsService, OnboardingDetailsRegiesterService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { 
 
}
