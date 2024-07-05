import { Component } from '@angular/core';
import {ToasterService } from '@proc-admin-web/shared-services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'login-app';

  constructor(private toasterservice: ToasterService){
  }
}
