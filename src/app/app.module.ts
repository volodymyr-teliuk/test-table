import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedTableModule } from './shared/modules/shared-table/shared-table.module';
import { DataTest1Service } from './shared/services/data-test-1.service';
import { DataTest2Service } from './shared/services/data-test-2.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedTableModule,
  ],
  providers: [
    DataTest1Service,
    DataTest2Service,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
