import { Component, OnInit }           from '@angular/core';
import { ReservationDataService }      from '../services/reservation-data.service';
import { CommonModule } from '@angular/common';
import { Reservation }                 from '../models/reservation';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservatino-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css'
})

export class ReservationsListComponent implements OnInit {
  reservations: Reservation[] = [];
  error = '';

  constructor(private svc: ReservationDataService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe({
      next: data => this.reservations = data,
      error: err => this.error = err.message || 'Failed to load'
    });
  }

  delete(id: string) {
    if (!confirm('Delete this reservation?')) return;
    this.svc.delete(id).subscribe({
      next: () => this.load(),
      error: err => this.error = err.message
    });
  }
}
