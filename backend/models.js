import axios from 'axios'

class Booking {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  list() {
    return this.api.get('/bookings').then(res => res.data)
  }
  find(bookingId) {
    return this.api.get(`/bookings?bookingCode=${bookingId}`).then(res => res.data)
  }
}

export default new Booking()