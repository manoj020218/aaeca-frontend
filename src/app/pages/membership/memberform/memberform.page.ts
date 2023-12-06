import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal, Platform } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//camera and file system both together to handle image
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
//***// */

import { AlertController,LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Member } from 'src/app/models/member';
// animation from right to left for modal open 
import { AnimationController } from '@ionic/angular';
import { createAnimation } from '@ionic/core';

import { MemberService } from 'src/app/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.page.html',
  styleUrls: ['./memberform.page.scss'],
})
export class MemberformPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  myForm!: FormGroup;
  selectedImage: any;

  images: LocalFile[] = [];

  constructor(    
    private formBuilder: FormBuilder,
    private animationCtrl: AnimationController, // for animation control 
    private loadingCtrl: LoadingController,
    public router :Router,
    public route :ActivatedRoute,
    public memberApi:MemberService,
    // public userApi: UserService,    
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    // private navCtrl: NavController,
    private cd: ChangeDetectorRef,
    private plt: Platform,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.membershipForm();
  }

  membershipForm(){
    this.myForm = this.formBuilder.group({
      // Define your form controls and their validation rules
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      middle_name: [''],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      roll_number: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]],
      whatsapp_number: ['', [Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')]],
      degree_name: ['', [Validators.required, Validators.minLength(3)]],
      passout_year: ['', [Validators.required, Validators.minLength(4)]],
      gender: ['', [Validators.required, Validators.minLength(3)]],
      linkedin: [''],
      xhandle: [''],
      employer: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['', [Validators.required, Validators.minLength(3)]],
      official_email: ['', [Validators.required,
        // Validators.toLowerCase(),
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]],
      email: ['', [Validators.required,
        // Validators.toLowerCase(),
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]],
      current_city: ['', [Validators.required, Validators.minLength(3)]],
      current_country: ['', [Validators.required, Validators.minLength(3)]],
      current_pincode: ['', [Validators.required, Validators.minLength(3)]],
      current_address: ['', [Validators.required,Validators.minLength(5),
        Validators.maxLength(200),]],
      image: [''],
      tc_1: ['', [Validators.required]],
      tc_2: ['', [Validators.required]],

    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  checkPlatformforWeb(){
    if(Capacitor.getPlatform()=='web' || Capacitor.getPlatform()=='ios') return true;
    return false;
  }

  async takePicture(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      source: CameraSource.Prompt, // allow option to choose from galary or camera
      width:600,

      // resultType: CameraResultType.Base64, // Use Base64 for simplicity
      resultType: this.checkPlatformforWeb() ? CameraResultType.DataUrl : CameraResultType.Uri, // f0r PWA
    });
    // Use the image data as needed
    console.log("image", image.base64String);
    this.myForm.patchValue({'image':this.selectedImage.dataUrl})
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    this.selectedImage = image;
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };

  showImage(){
    if(this.checkPlatformforWeb()) this.selectedImage.webPath = this.selectedImage.dataUrl;

    // to show image on html page use <img [src]=selectedImage?.webPath />
  }

  //https://capacitorjs.com/docs/apis/share take help of this to share 
  async share(){
    await Share.share({
      title: 'Share via Whatsapp',
      text: 'Sharing an Image',
      url: this.selectedImage.path,
      dialogTitle: 'Share with whatsapp',
    });

  }
  
  onSubmit() {
    console.log(this.myForm.value);
    if (this.myForm.valid) {
      // Form is valid, handle the submission logic
      console.log('Form submitted:', this.myForm.value);
    }
  }

  cancel() {
    // this.modal.dismiss(null, 'cancel');
    this.router.navigate(['/membership'],{replaceUrl:true});    
  }

  confirm() {
    // this.onSubmit();
    this.router.navigate(['/membership/directory'],{replaceUrl:true});
    // this.modal.dismiss(this.name, 'confirm');
  
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async presentAlert(header:string,subheader:string, message:string) {
    const alert = await this.alertCtrl.create({
      header:header,
      subHeader: subheader,
      message:message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  BacktoDirectory(){
    this.router.navigate(['/membership/directory'],{replaceUrl:true});
  }


   /**
   *@param event {EventObject} - the javascript change event
   *@param field {String} - the form field control name
   */
   onFileChange(event, field) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('image')) {
        this.myForm.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.myForm.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }



  // Create a new file from a capture image
async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
        path: `${IMAGE_DIR}/${fileName}`,
        data: base64Data,
        directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
}

async loadFiles() {
  this.images = [];

  const loading = await this.loadingCtrl.create({
    message: 'Loading data...'
  });
  await loading.present();

  Filesystem.readdir({
    path: IMAGE_DIR,
    directory: Directory.Data
  })
    .then(
      (result) => {
        this.loadFileData(result.files.map((x) => x.name));
      },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: Directory.Data
        });
      }
    )
    .then((_) => {
      loading.dismiss();
    });
}

	// Get the actual base64 data of an image
	// base on the name of the file
	async loadFileData(fileNames: string[]) {
		for (let f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f}`;

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
		}
	}

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }
}

// Helper function
convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});


async selectImage() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri,
    source: CameraSource.Photos // Camera, Photos or Prompt!
});

if (image) {
    this.saveImage(image)
}

}

async startUpload(file: LocalFile) {
  const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    this.uploadData(formData);
}

async uploadData(formData: FormData) {
  const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
  });
  await loading.present();

  // Use your own API!
  const url = 'http://localhost:8888/images/upload.php';

  this.http.post(url, formData)
      .pipe(
          finalize(() => {
              loading.dismiss();
          })
      )
      .subscribe(res => {
          if (res['success']) {
              this.presentToast('File upload complete.')
          } else {
              this.presentToast('File upload failed.')
          }
      });
}


async deleteImage(file: LocalFile) {
  await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
  });
  this.loadFiles();
  this.presentToast('File removed.');
}


	// Little helper
	async presentToast(text) {
		const toast = await this.toastCtrl.create({
			message: text,
			duration: 3000
		});
		toast.present();
	}
  

}
