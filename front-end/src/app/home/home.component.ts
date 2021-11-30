import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { Booking } from '../models/booking';

const Get_Bookings = gql`
query{
  bookings{
    bookingCode
    passengers {
      id,
      firstName,
      lastName
    }       
  }
}
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bookingCode: string = "";
  familyName: string = "";
  bookings: any = [];
  loading = false;
  error: string;

  constructor(private apollo: Apollo, private router: Router) { }
  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: Get_Bookings
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.bookings = data.bookings
      })
  }

  submit(): void {
    let x = this.bookings.filter(array => array.bookingCode == this.bookingCode);
    if (x.length > 0) {
      var booking = x[0]; 
      if (booking.passengers.lastName == this.familyName) {
        //replace with navigaton logic
        this.router.navigate(['/details'], { queryParams: { bookingId: this.bookingCode } });
      } else {
        //replace with error logic
        alert('Booking not found')
      }
    } else {      
        //replace with error logic
      alert('Booking not found')
    }

  }
}