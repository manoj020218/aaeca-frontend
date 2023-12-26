import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // constructor(public jwtHelper: JwtHelperService) {}

  // // Check if the token is expired
  // isTokenExpired(token: string): boolean {
  //   return this.jwtHelper.isTokenExpired(token);
  // }

  // // Decode the token
  // decodeToken(token: string): any {
  //   return this.jwtHelper.decodeToken(token);
  // }

  
}
