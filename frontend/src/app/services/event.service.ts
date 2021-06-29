import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  domain = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  authorization_header
  currentUser = {};
  window: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // Add Event to Calender//
  addEvent(event) {
    this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')} };
    return this.http.post(this.domain + '/event/add-event', event, this.authorization_header);
  }

  // Get All Events //
  getAllEvents() {
    this.authorization_header = { headers: { 'Content-Type': 'application/json','Authorization': localStorage.getItem('token')} };
    return this.http.get(this.domain + '/event/get-events', this.authorization_header).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('err getting events');
        })
      );
  }

  // Delete Single Event//
  deleteSingleEvent(id) {
    return this.http.delete(this.domain + '/event/delete_event/' + id).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('err delete');
        })
      );
  }
}

