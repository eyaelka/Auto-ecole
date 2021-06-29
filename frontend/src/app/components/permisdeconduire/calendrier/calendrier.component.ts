import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CalendarOptions } from '@fullcalendar/common';
import { HttpClient } from '@angular/common/http';
import { EventService } from 'src/app/services/event.service';
import { Events } from 'src/app/events';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  calendarOptions: CalendarOptions;
  error: any;
  events: Events;
  constructor(
    public http: HttpClient,
    public authService:AuthService,
    private eventService: EventService
  ) {}

  handleDateClick(arg) {

  }

  onSelectx(event) {

  }

  ngOnInit() {
    this.getAllEvents();
  }

  deleteEvent(id) {
    this.eventService.deleteSingleEvent(id).subscribe((data: any) => {});
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      const self = this;
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        selectable: false,
        editable: false,
        // dateClick: this.handleDateClick.bind(this),
        select: this.handleDateClick.bind(this),
        events: data,
        eventClick(evetData) {
          // tslint:disable-next-line:variable-name
          const event_id = evetData.event._def.extendedProps._id;
          Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            timer: 30000,
          }).then((result) => {
            if (result.value) {
              self.deleteEvent(event_id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              self.getAllEvents();
            }

          }).catch(() => {
            Swal.fire('Failed!', 'There was something went wrong.');
          });
        }
      };
    });
  }
}




