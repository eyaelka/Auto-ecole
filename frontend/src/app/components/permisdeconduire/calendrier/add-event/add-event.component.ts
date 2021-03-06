import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event = {
    title: '',
    date: ''
  };
  error: any;
  constructor(
    public http: HttpClient,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  saveEvent() {
    const event = {
      title: this.event.title,
      date: this.event.date
    };
    this.eventService.addEvent(event)
      .subscribe(
        (response: any) => {
          if (response.type === 'success') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your Event has been added successfully',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/calendrier']);
          }
        },
        err => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Something went wrong',
            showConfirmButton: false,
            timer: 1500
          });
          this.event.title = '';
          this.event.date = '';
        });
  }
}

