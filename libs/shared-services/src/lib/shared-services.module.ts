import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        timeOut: 2000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }) ],
  exports: [
    BrowserAnimationsModule,
    ToastrModule
  ]
})
export class SharedServicesModule {}
