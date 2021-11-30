import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

const Get_Bookings = gql`
query Booking($bookingId: String!) {
  booking(bookingId: $bookingId) {
    bookingCode,
    contactDetails {
      address,
      class
    },
    passengers {
      title {
        name
      }
      firstName,
      lastName
    },
    itinerary {
      connections {
        destination {
          city {
            country {
              name
            },
            name
          }
          name
        },
        origin {
          city {
            country {
              name
            },
            name
          },
          name
        }
      }
    }

  }
}
`;

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  bookings: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: Get_Bookings,
      variables: {
        bookingId: 'PZIGZ3',
      }
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.bookings = data.booking
        console.log(this.bookings);
        
      })
  }

  getAuthorNames(authors) {
    if (authors.length > 1)
      return authors.reduce((acc, cur) => acc.name + ", " + cur.name);
    else return authors[0].name;
  }
}