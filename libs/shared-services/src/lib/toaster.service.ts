import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: any) {
    this.toastr.success(title)
  }

  showError( title: any) {
    this.toastr.error(title)
  }

  showInfo(title:any) {
    this.toastr.info(title)
  }

  showWarning(title: any) {
    this.toastr.warning(title)
  }
}
