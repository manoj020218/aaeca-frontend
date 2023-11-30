import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {

  myForm!: FormGroup;

  //shoot and upload photo both option
  // use form data in modal
  // on page write about membership banefit only and 
  //bottom give button "i am in"
  //use payment gateway to collect money 
  //
  
  constructor(
    private formBuilder: FormBuilder,
  ) {}



  ngOnInit() {
    this.membershipForm();
  }

  membershipForm(){
    this.myForm = this.formBuilder.group({
      // Define your form controls and their validation rules
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      middle_name: [''],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      roll_No: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      whatsapp_mobile: ['', [Validators.required, Validators.minLength(10)]],
      degree: ['', [Validators.required, Validators.minLength(3)]],
      passing_year: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['', [Validators.required, Validators.minLength(3)]],
      linkedin: ['', [Validators.required, Validators.minLength(3)]],
      twitter: ['', [Validators.required, Validators.minLength(3)]],
      employer: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      official_email: ['', [Validators.required, Validators.email]],
      private_email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required, Validators.email]],
      addTC: ['', [Validators.required]],
      shareTC: ['', [Validators.required]],

    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, handle the submission logic
      console.log('Form submitted:', this.myForm.value);
    }
  }

}
