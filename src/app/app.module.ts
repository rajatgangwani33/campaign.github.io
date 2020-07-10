import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeWrapperComponent } from './home/components/home-wrapper.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CampaignDetailComponent } from './home/components/campaign-detail/campaign-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { CampaignRowComponent } from './home/components/campaign-row/campaign-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeWrapperComponent,
    CampaignDetailComponent,
    CampaignRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  
    NoopAnimationsModule,
    MatTabsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),

    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
