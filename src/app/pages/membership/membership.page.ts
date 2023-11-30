import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Camera, CameraResultType } from '@capacitor/camera';
 

@Component({
  selector: 'app-membership',
  templateUrl: './membership.page.html',
  styleUrls: ['./membership.page.scss'],
})
export class MembershipPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

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
      address: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required, Validators.email]],
      addTC: ['', [Validators.required]],
      shareTC: ['', [Validators.required]],

    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  // async takePicture() {
  //   const image = await Camera.getPhoto({
  //     quality: 90,
  //     allowEditing: false,
  //     resultType: CameraResultType.Base64, // Use Base64 for simplicity
  //     source: CameraSource.Camera, // Use Camera as the image source
  //   });

  //   // Use the image data as needed
  //   console.log(image.base64Data);
  // }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };
  
  onSubmit() {
    if (this.myForm.valid) {
      // Form is valid, handle the submission logic
      console.log('Form submitted:', this.myForm.value);
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
