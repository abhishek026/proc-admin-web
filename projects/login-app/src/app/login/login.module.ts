import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { ProcloginComponent } from '../proclogin/proclogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ProcloginComponent,LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    LoginRoutingModule,
    FormsModule, // Add FormsModule here
    ReactiveFormsModule // Import ReactiveFormsModules
  ]
})
export class LoginModule { }
