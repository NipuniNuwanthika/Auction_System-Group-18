import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'services/login.service';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  inputForm: FormGroup;
  isDataLoading: boolean = false;

  constructor(
    private notificationService: NotificationService,   
    private loginService: LoginService,
    private formBuilder: FormBuilder,         //Inject the FormBuilder service in the LoginComponent constructor()
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({ // add form validation
      type: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required]],
    });
  }


  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  /**
   * do the login
   */
  login() {
    this.isDataLoading = true;
    this.loginService.attemptLogin(this.inputForm.value).subscribe(data => {
      this.isDataLoading = false;
      this.notificationService.showSuccessMsg("Success", "Welcome back", 5000);
      if(this.inputForm.get('type').value == "seller"){
        this.router.navigateByUrl('/seller');
      }else{
        this.router.navigateByUrl('/buyer');
      }
    }, error => {
      this.isDataLoading = false;
      this.notificationService.showErrorMsg("Error", error.msg, 5000);
    });

  }

}
