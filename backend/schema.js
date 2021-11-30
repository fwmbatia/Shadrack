import { gql } from 'apollo-server-express'
import bookingModel from './models'

export const typeDefs = gql`
type Title { code: String name: String }

type Passengers { id: Int
  firstName: String
  lastName: String
  title: Title }

type Equipment { code: String name: String }

type Cabin { code: String name: String }

type ArrivalTerminal { name: String }

type Carrier { code: String name: String }

type OperatingFlight { number: String
  duration: String
  flown: Boolean
  checkInStart: String
  localCheckInStart: String
  checkInEnd: String
  localCheckInEnd: String
  scheduledArrival: String
  localScheduledArrival: String
  scheduledDeparture: String
  localScheduledDeparture: String
  equipment: Equipment
  cabin: Cabin
  arrivalTerminal: ArrivalTerminal
  carrier: Carrier }

type SellingClass { code: String }

type Status { code: String name: String }

type MarketingFlight { number: String
  numberOfStops: Int
  operatingFlight: OperatingFlight
  sellingClass: SellingClass
  status: Status
  carrier: Carrier }

type Country { code: String name: String }

type City { IATACode: String name: String country: Country }

type ArriveOn { IATACode: String name: String city: City }

type DepartFrom { IATACode: String name: String city: City }

type Segments { id: Int
  type: String
  informational: Boolean
  marketingFlight: MarketingFlight
  arriveOn: ArriveOn
  departFrom: DepartFrom }

type Destination { IATACode: String name: String city: City }

type Origin { IATACode: String name: String city: City }

type Connections { id: Int
  duration: String
  segments: [Segments ]
  destination: Destination
  origin: Origin }

type Itinerary { type: String connections: [Connections ] }

type ContactDetails { class: String address: String }

type Bookings { bookingCode: String
  passengers: Passengers
  itinerary: Itinerary
  contactDetails: [ContactDetails ] }

type Query { bookings: [Bookings ], booking(bookingId: String!): Bookings }
`

export const resolvers = {
    Query: {
          bookings(){
              return bookingModel.list();
          },
          async booking(parent, args, context, info) {
            var x = await bookingModel.find(args.bookingId);
            return x[0];
          }
    },

}