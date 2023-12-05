import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError,map,OperatorFunction, tap, BehaviorSubject, filter } from 'rxjs';
import { Member } from '../models/member';
import { environment } from 'src/environments/environment.prod';

const baseUrl = environment.SERVER+'/members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {  
  private allMembers$ = new BehaviorSubject<Member[]>(undefined);
  // baseUri :string = 'http://localhost:3000/api/v1';
  baseUri : string = environment.SERVER;
  
  headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Content-Type', 'application/x-www-form-urlencoded');    
  
  constructor(private http: HttpClient) { }

  selectedMember:Member;
  members:Member[];

  
  // getAll(): Observable<Member[]> {
  //   console.log("i m in get all loop");
  //   return this.http.get<Member[]>(baseUrl);
  // }

  // getMember(id: any): Observable<Member> {
  //   console.log("i m in get member by ID function");
  //   return this.http.get(`${baseUrl}/findone?id=${id}`).pipe(map(response => response));;
  // }

  // addMember(data: any): Observable<any> {
  //   console.log("i m in add member loop");
  //   let url = `${this.baseUri}/members`;
  //   return this.http.post(url, data).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),
  //   catchError(this.errorMgmt));
  // }

  // update(id: any, data: any): Observable<any> {
  //   console.log("i m in Update by ID function");
  //     console.log(`${id}`);
  //   console.log(`${baseUrl}/${id}`);
  //   return this.http.put(`${baseUrl}/${id}`,data).pipe(tap((dat:any)=>console.log(`updated with ID =${dat._id}`)),
  //   catchError(this.errorMgmt));
  // }

  // delete(id: any): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`).pipe(catchError(this.errorMgmt));
  // }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl).pipe(catchError(this.errorMgmt));
  // }

  // queryMembers(searchstring: any): Observable<Member[]> {
  //   // console.log("i m in wild search loop");
  //   this.http.get<Member[]>(`${baseUrl}/accepted/${searchstring}`).subscribe(members=>this.allMembers$.next(members));
  //   return this.watchAllMembers().pipe(catchError(this.errorMgmt));
  // }

  //  //to display all members of particular gym
  //  watchAllMembers(): Observable<Member[]> {
  //   return this.allMembers$.pipe(filter(maybe => !!maybe)); 
  // }

  
  // // Error handling
  // errorMgmt(error: HttpErrorResponse) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }

}