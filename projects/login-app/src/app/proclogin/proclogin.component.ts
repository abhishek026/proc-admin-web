import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpService,ToasterService,LoaderService } from '@proc-admin-web/shared-services';
@Component({
  selector: 'app-proclogin',
  //standalone: true,
  //imports: [],
  templateUrl: './proclogin.component.html',
  styleUrl: './proclogin.component.scss'
})
export class ProcloginComponent implements OnInit {
  loginDataForm: any
  isMultiLogin: any = false;
  accounts: any[] = []
  multiLoginForgotPwdData: any = [];
  submited: boolean = false;
  passwordType: any = 'password';
  passwordClass: any = 'fas fa-eye-slash';
  forgotPasswordObj = {
    institution_id: '',
    userid: '',
    temp_id: ''
  }
  countryDetails: any;
  messages: any;
  isInstExpire: boolean = false;
  instData: any;
  hideLoginPage: boolean = true;
  msg: any;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private titleService: Title,
    private http: HttpClient,
    private httpservice : HttpService,
    private toasterservice: ToasterService,
    private loaderservice: LoaderService
  ) {
    //this.messages = msgService.getMessages();
    let data = JSON.parse(sessionStorage.getItem('idata')!);
    if (data) {
      this.loginToSubBranch(data);
    }
    else{
      sessionStorage.clear()
     }
  }
  loginToSubBranch(instData: any) {
    // this.logins.loginToSubBranch(instData.s_inst_id).subscribe(
    //   (res:any) => {
    //     let token: any = sessionStorage.getItem("m_b_tk");
    //     sessionStorage.clear();
    //     this.setLoginData(res, false);
    //     if (instData.m_inst_id > 0) {
    //       sessionStorage.setItem("m_b_inst_id", instData.m_inst_id + "");
    //       sessionStorage.setItem("m_b_tk", token);
    //     }
    //   }
    // )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user_name: ['', Validators.nullValidator],
      password: ['', Validators.nullValidator],
      logout_from_all_devices: [false],
      source: ['WEB'],
      device_id: []
    });
    this.titleService.setTitle('Proctur -Simplifying Education Management');
  }
  doLogin() {
    this.loaderservice.show();
    let msg=this.httpservice.getMessage();
    this.submited = true
    if (this.loginForm.invalid) {
      return;
    }
    this.login(this.loginForm.value)
  }

  login(data: any) {
    if (data.user_name) {
       data.user_name = data.user_name.trim();
    }
    sessionStorage.clear();
    const apiUrl=environment.ApiUrl + '/api/v2/user/v3/login?is_admin=true';
    this.http.post(apiUrl,data).subscribe((res:any)=>{
      let result=res.result;
      this.loaderservice.hide();
    },(error:any)=>{
      this.toasterservice.showError(error.error.message);
      this.loaderservice.hide();
    }
    )
    // this._accountUtilService.showLoader();
    // this._userService.doLogin(data).subscribe(async (res: any) => {
      
    //   this._accountUtilService.hideLoader()
    //   if (res.statusCode == 200 && res.validate && res.result != null) {
    //     if (Utils.checkIsArray(res.result)) {
    //       this.accounts = res.result
    //       // multiple accounts found please continue with one account on first position
    //       // Utils.showConsole('multiple accounts found')
    //       if (res.result.length > 1) {
    //         this.openMultiLogin()
    //       } else {
    //         this.selectLogIn(res.result[0])
    //       }
    //     } else {
    //       this.setLoginData(res, true);
    //     }
    //   }
    // },
    //   (err: HttpErrorResponse) => {
    //     this._accountUtilService.hideLoader()
    //     if (err && err.error && err.error.result && (err.error.result.redirect_url != null || err.error.result.redirect_url != "")) {
    //       this.isInstExpire = true;
    //       this.hideLoginPage = false;
    //       this.instData = err.error.result;
    //       let url = this.instData.redirect_url + "?tk=" + this.instData.jwt_token;
    //       this.msg = "Your Subscription has Expired. Don't Worry , you will not lose any data.To keep using the Proctur , Please renew the subscription at <a href=" + url + " target=\"_BLANK\">renew link</a> For any assistance please connect to us at Email id: support@proctur.com or Mob: 9971839153";
    //       this.msg = err.error.result.message;
    //       // this.msg= this._domSanitizer.bypassSecurityTrustHtml(this.msg);
    //     }
    //   })
  }
  setLoginData(res: any, isMainBranchLogin: boolean) {
    this.setsessionStorage(res)
    if (isMainBranchLogin) {
      // this._toasterService.showSuccess('Loggedin Successfully')
    }
  //  Redirections.redirectHome(this._router)
    this.getCountryDetails(res.result.institute_id);
    this.getAcademicYRSetting();

  }
  getAcademicYRSetting() {
    // this.logins.getAcademicYearSetting().subscribe((response: any) => {
    //   sessionStorage.setItem('marks_dist_setting', response?.result?.marks_dist_setting);
    // })
  }
  selectLogIn(account: any) {
    this.login({ institute_id: account.institute_id, user_id: account.user_id, source: "WEB", user_type: account.user_type })
  }
  setsessionStorage(res: any) {
    sessionStorage.setItem("acadYrStartDate", res.result.ay_start_date);
    sessionStorage.setItem("acadYrEndDate", res.result.ay_end_date);
    sessionStorage.setItem("current_acad_yr_id", res.result.acad_yr_id);
    sessionStorage.setItem("isWhiteLabled", "false")
    sessionStorage.setItem("m_b_inst_id", "");
    sessionStorage.setItem("m_b_tk", "");
    sessionStorage.setItem("modal1", "true");
    sessionStorage.setItem("modal2", "true");
    sessionStorage.setItem('institute_type', res.result.institute_type);
    //this._accountUtilService.setCurrentUser(JSON.stringify(res.result))
   // this._accountUtilService.setIsSchoolModel(res.result.is_institute_type_school)
   // this._accountUtilService.setSelectedTab(1, 0)
    sessionStorage.setItem('course_structure_flag', res.result.course_structure_flag)
    sessionStorage.setItem('institute_id', res.result.institute_id);
    sessionStorage.setItem('userid', res.result.user_id);
    sessionStorage.setItem('username', res.result.username);
    sessionStorage.setItem('permissions', JSON.stringify(res.result.permission_id_list));
   // this._accountUtilService.setToken(btoa(res.result.user_id + "|" + res.result.user_type + ":" + res.result.password + ":" + res.result.institute_id + "|" + res.result.acad_yr_id));
    if (res.result.user_type == '0' || res.result.user_type == '3') {
      this.createTablePreferences();
    }
    //this._accountUtilService.changeMainBranchValue(res.result.is_main_branch);
   // this._userService.changeUserType(res.result.userType);
   // this._accountUtilService.makeInstituteType(res.result.institute_type, res.result.course_structure_flag);
    sessionStorage.setItem('user_permission', res.result.permission_id_list);
    sessionStorage.setItem('institution_id', res.result.institute_id); //y
    sessionStorage.setItem('accountId', res.result.account_id);
    sessionStorage.setItem('alternate_email_id', res.result.email_id);
    sessionStorage.setItem('email_id', res.result.email_id);
    sessionStorage.setItem('biometric_attendance_feature', res.result.enable_biometric_attendance_feature);
    sessionStorage.setItem('course_structure_flag', res.result.course_structure_flag);
    sessionStorage.setItem('enable_tax_applicable_fee_installments', res.result.enable_tax_applicable_fee_installments);
    sessionStorage.setItem('enable_vdoCipher_feature', res.result.enable_vdocipher_feature);
    sessionStorage.setItem('enable_vimeo_feature', res.result.enable_vimeo_feature);
    sessionStorage.setItem('inst_set_up', res.result.institute_setup_type);
    sessionStorage.setItem('institute_name', res.result.institute_name);
    sessionStorage.setItem('allow_sms_approve_feature', res.result.allow_sms_approve_feature);
    sessionStorage.setItem('is_main_branch', res.result.is_main_branch);
    sessionStorage.setItem('manual_student_disp_id', res.result.is_student_displayId_manual);
    sessionStorage.setItem('enable_assign_feature', res.result.enable_assign_to_feature);
    sessionStorage.setItem('online_payment_feature', res.result.enable_online_payment_feature);
    sessionStorage.setItem('password', res.result.password);
    sessionStorage.setItem('test_feature', res.result.test_feature);
    sessionStorage.setItem('userType', res.result.user_type);
    sessionStorage.setItem('username', res.result.username);
    sessionStorage.setItem('name', res.result.name);
    sessionStorage.setItem('mobile_no', res.result.phone_no);
    sessionStorage.setItem('phone_no', res.result.phone_no);
    sessionStorage.setItem('inst_announcement', res.result.institute_announcement);
    sessionStorage.setItem('logo_url', res.result.institute_logo_url);
    sessionStorage.setItem('permitted_roles', JSON.stringify(res.result.featureDivMapping));
    sessionStorage.setItem('enable_online_payment_feature', res.result.enable_online_payment_feature);
    sessionStorage.setItem('institute_setup_type', res.result.institute_setup_type);
    sessionStorage.setItem('enable_elearn_course_mapping_feature', res.result.enable_elearn_course_mapping_feature);
    sessionStorage.setItem('enable_eLearn_feature', res.result.enable_eLearn_feature);
    sessionStorage.setItem('enable_expense_management', res.result.enable_expense_management);
    sessionStorage.setItem('website_url', res.result.website_url);
    sessionStorage.setItem('enable_fee_template_country_wise', res.result.enable_fee_template_country_wise);
    sessionStorage.setItem('tax_type_without_percentage', res.result.tax_type);
    sessionStorage.setItem('tax_type_with_percentage', res.result.tax_type + "(%)");
    sessionStorage.setItem('is_zoom_enable', JSON.stringify(res.result._zoom_integration_enable))
    sessionStorage.setItem('enable_ip_lock_feature', res.result.enable_ip_lock_feature);
    sessionStorage.setItem("student_study_material_visibility", res.result.student_study_material_visibility);
    sessionStorage.setItem('youtube_url', res.result.youtube_url);
    sessionStorage.setItem('facebook_url', res.result.facebook_url);
    sessionStorage.setItem('whatsapp_url', res.result.whatsapp_url);
    sessionStorage.setItem('linkedin_url', res.result.linkedin_url);
    sessionStorage.setItem('instagram_url', res.result.instagram_url);
    sessionStorage.setItem('website_url', res.result.website_url);
    sessionStorage.setItem('privacy_alert', 'true');
    sessionStorage.setItem('liveClassExpiryPop', "true");
    sessionStorage.setItem('feedback_url', res.result.feedback_url);
    sessionStorage.setItem('help_url', res.result.help_url);
    sessionStorage.setItem('terms_and_condition_url', res.result.terms_and_condition_url);
    sessionStorage.setItem('privacy_policy_url', res.result.privacy_policy_url);
    sessionStorage.setItem('deviceId', res.result.device_id);
    sessionStorage.setItem('login_option', res.result.login_option);
    sessionStorage.setItem('payment_amount', res.result.payment_amount);
    sessionStorage.setItem('payment_due_date', res.result.payment_due_date);
    sessionStorage.setItem('single_device', res.result.single_device_login);
    sessionStorage.setItem('enable_library_feature', res.result.enable_library_feature);
    sessionStorage.setItem('enable_client_website', res.result.enable_client_website);
    sessionStorage.setItem('teacherIDs', res.result.teacher_id);
    sessionStorage.setItem('mark_attendance_subject_wise', res.result.mark_attendance_subject_wise);
    sessionStorage.setItem('marks_dist_setting', res.result.marks_dist_setting);
    sessionStorage.setItem('is_fee_struct_linked', res.result._fee_struct_link_with_cour_or_stand);
    sessionStorage.setItem('payment_amount', res.result.payment_amount);
    sessionStorage.setItem('payment_due_date', res.result.payment_due_date);
    sessionStorage.setItem('enable_online_assignment_feature', res.result.enable_online_assignment_feature);
    sessionStorage.setItem('custom_text_for_power_by_proctur', res.result.custom_text_for_power_by_proctur);
    sessionStorage.setItem('show_powered_by_proctur', res.result.show_powered_by_proctur);
    sessionStorage.setItem('is_paypal_enabled', res.result.enable_paypal);
    sessionStorage.setItem('plan_name', res.result.inst_plan_det.plan_name);
    sessionStorage.setItem('is_mgrt_from_batch_to_course', res.result.inst_plan_det.is_mgrt_from_batch_to_course);
    sessionStorage.setItem('is_exam_grad_feature', res.result.inst_plan_det.is_exam_grad_feature);
    sessionStorage.setItem('enable_routing', res.result.inst_plan_det.enable_routing);
    sessionStorage.setItem('open_enq_Visibility_feature', res.result.inst_plan_det.open_enq_Visibility_feature);
    sessionStorage.setItem('is_tms', res.result.inst_plan_det.is_tms);
    sessionStorage.setItem('enable_current_month_class_att_update_only', res.result.inst_plan_det.enable_current_month_class_att_update_only);
    sessionStorage.setItem('is_website_sub_domain', res.result.inst_plan_det.is_website_sub_domain);
    sessionStorage.setItem('is_whitelable_app', res.result.inst_plan_det.is_whitelable_app);
    sessionStorage.setItem('exam', res.result.inst_plan_det.exam);
    sessionStorage.setItem('file_manager_study_material', res.result.inst_plan_det.file_manager_study_material);
    sessionStorage.setItem('is_marketing_and_banner', res.result.inst_plan_det.is_marketing_and_banner);
    sessionStorage.setItem('institute_expiry_date', res.result.inst_plan_det.institute_expiry_date);
    sessionStorage.setItem('instl_amt_based_fee_receipt', res.result.inst_plan_det.instl_amt_based_fee_receipt);
    sessionStorage.setItem('acc_susp_modal', 'true');
    sessionStorage.setItem('institute_added_date',res.result.institute_added_date);
    sessionStorage.setItem('ay_expire_modal','true')

  }

  getCountryDetails(institute_id: any) {
    // this._userService.getInstituteCountryDetails(institute_id).subscribe(
    //   (res: any) => {
    //     this.countryDetails = res;
    //     for (let i = 0; i < this.countryDetails.length; i++) {
    //       let row: any = this.countryDetails[i];
    //       row.symbol = this.getCurrencyDetails(900, row.currency_code, row.country_code);
    //       if (row.is_default == 'Y') {
    //         this._commonService.setDefaultCurrencySymbol(row.symbol);
    //       }
    //     }
    //     sessionStorage.setItem('country_data', JSON.stringify(this.countryDetails));
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  getCurrencyDetails(value: any, currency: any, lang: any) {
    if (value && currency && lang) {
      let formatted = value.toLocaleString(lang, {
        maximumFractionDigits: 4,
        style: 'currency',
        currency: currency
      });

      formatted = formatted.replace(/[,.]/g, '');
      return formatted.replace(/[0-9]/g, '');
    }
    else {
      return lang;
    }
  }

  createTablePreferences() {
    // if (sessionStorage.getItem('userid') != null && sessionStorage.getItem('course_structure_flag')) {
    //   if (!this._tablePreferencesService.getTablePreferences('procturTablePreference')) {
    //     Utils.showConsole('createdsessionStorageStructure enterd')
    //     this._tablePreferencesService.createdsessionStorageStructure({ userId: sessionStorage.getItem('userid'), role: sessionStorage.getItem('course_structure_flag') });
    //   }
    // }
  }

  close() {
    this.isMultiLogin = false
    this.loginForm.value.user_name = '';
    this.loginForm.value.password = '';
  }

  openMultiLogin() {
    this.isMultiLogin = true
    this.hideLoginPage = false;
  }
  // --------------------forgot-password--------------------------
  forgotPassword() {
    // let forgotPasswordData = {
    //   alternate_email_id: "",
    //   "institution_id": this.forgotPasswordObj.institution_id,
    //   "userid": this.forgotPasswordObj.userid
    // }
    // if (this.loginForm.value.user_name.trim() == "") {
    //   this.msgService.showInfoMessage('Enter valid Mobile or Email-id');
    // }
    // else {
    //   if (confirm('New password will be sent to your registered number. Click Ok to continue.')) {
    //     forgotPasswordData.alternate_email_id = this.loginForm.value.user_name;
    //     this.logins.forgotPassowrdServiceMethod(forgotPasswordData).subscribe(
    //       (el: any) => {
    //         this.forgotPasswordObj.userid = '';
    //         this.forgotPasswordObj.institution_id = '';
    //         this.forgotPasswordObj.temp_id = '';
    //         $('#multiLoginForgot').modal('hide');
    //         if (el.message == 'OK') {
    //           this.msgService.showSuccessMessage(this.messages.loginMsg.success.body);
    //         } else {
    //           this.multiLoginForgotPwdData = el;
    //           $('#multiLoginForgot').modal('show');
    //         }
    //       },
    //       (err: any) => {
    //         this.msgService.showErrorMessage(err.error.message);
    //       })
    //   }
    // }
  }
  // --------------------------end---------------------------
  onForgotPwdSelection(event: any, data: any) {
    this.forgotPasswordObj.institution_id = data.institute_id;
    this.forgotPasswordObj.userid = data.user_id;
  }
  closePopup() {
    this.forgotPasswordObj.userid = '';
    this.forgotPasswordObj.institution_id = '';
    this.forgotPasswordObj.temp_id = '';
   // ($("#multiLoginForgot") as any).modal('hide');
  }
  openGetAdvice() {
    let url = "https://proctur.com/website/contact-us";
    window.open(url);
  }

  togglePassword() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
      this.passwordClass = 'fas fa-eye';
    } else {
      this.passwordType = 'password';
      this.passwordClass = 'fas fa-eye-slash';
    }
  }
  renewPlan(data: any) {
    let obj = {
      lid: data.lid,
    }
   // this.marketPlaceservice.loginToClientWebsite(obj);
  }
}
