import { Injectable } from '@angular/core';


import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError,map,OperatorFunction, tap, BehaviorSubject, filter } from 'rxjs';
import { Job } from '../models/job';
import { environment } from 'src/environments/environment.prod';

const baseUrl = environment.SERVER+'/jobs';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  private allPosts$ = new BehaviorSubject<Job[]>(undefined);
  // baseUri :string = 'http://localhost:3000/api/v1';
  baseUri : string = environment.SERVER;
  
  headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Content-Type','multipart/form-data'); 
            
 
  // Set up the options object with headers
  options = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  selectedPost:Job;
  awards:Job[];

  
  getAll(): Observable<Job[]> {
    console.log("i m in get all loop");
    return this.http.get<Job[]>(baseUrl);
  }

  // get(id: any): Observable<Job> {
  //   console.log("i m in get member by ID function");
  //   return this.http.get(`${baseUrl}/findone?id=${id}`).pipe(map(response => response));;
  // }

  add(data: any): Observable<any> {
    console.log("i m in add member loop",data);
    let url = `${this.baseUri}/jobs`;
    return this.http.post(url, data).pipe(tap((dat:any)=>console.log(`Added with ID =${dat._id}`)),
    catchError(this.errorMgmt));
  }

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

  query(searchstring: any): Observable<Job[]> {
    // console.log("i m in wild search loop");
    this.http.get<Job[]>(`${baseUrl}/search?term=${searchstring}`).subscribe(awards=>this.allPosts$.next(awards));
    return this.watchAll().pipe(catchError(this.errorMgmt));
  }

   //to display all awards of particular gym
   watchAll(): Observable<Job[]> {
    return this.allPosts$.pipe(filter(maybe => !!maybe)); 
  }

  
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}
