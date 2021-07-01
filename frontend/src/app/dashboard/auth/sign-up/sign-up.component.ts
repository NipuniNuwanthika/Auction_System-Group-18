import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'services/notification.service';
import { SignUpService } from 'services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  inputForm: FormGroup;
  isDataLoading: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private signUpService: SignUpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({ // add form validation
      type: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  /**
   * do the sign up
   */
  singUp() {
    if (this.inputForm.get('password').value == this.inputForm.get('confirm_password').value) {
      this.isDataLoading = true;
      var obj = {
        type: this.inputForm.get('type').value,
        first_name: this.inputForm.get('first_name').value,
        last_name: this.inputForm.get('last_name').value,
        email: this.inputForm.get('email').value,
        phone: this.inputForm.get('phone').value,
        address: this.inputForm.get('address').value,
        password: this.inputForm.get('password').value,
      };
      this.signUpService.new(obj).subscribe(data => {
        this.isDataLoading = false;
        this.notificationService.showSuccessMsg("Success", "Your account created", 5000);
        this.router.navigateByUrl("/auth/login");
      }, error => {
        this.isDataLoading = false;
        this.notificationService.showErrorMsg("Error", error.msg, 5000);
      });
    } else {
      this.isDataLoading = false;
      this.notificationService.showErrorMsg("Error", "Incorrect confirm password", 5000);
    }
  }

}
