// src/app/models/reservation.ts
export interface Reservation {
    id:        string;
    tripCode:  string;
    userEmail: string;
    date:      string;  // ISO date
    guests:    number;
  }
  