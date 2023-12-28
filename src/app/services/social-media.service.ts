import { Injectable } from '@angular/core';

import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor() {}

  openFacebook() {
    this.openApp('fb://profile/{user-id}'); // Replace {user-id} with the actual user ID
  }

  openTwitter() {
    this.openApp('twitter://user?screen_name={username}'); // Replace {username} with the Twitter username
  }

  // Add methods for other social media apps as needed

  private async openApp(deepLink: string) {
    
  //  await App.openUrl({ url: deepLink }).then(async (result) => {
  //     if (result.value) {
  //     await App.openUrl({ url: deepLink });
  //     } else {
  //       console.error(`App with deep link ${deepLink} not installed.`);
  //     }
  //   });
  }

}
