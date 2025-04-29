import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';



@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {
  code!: string;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    // Grab the code from the URL
    this.code = this.route.snapshot.paramMap.get('tripCode')!;
  }

  /** ← Put your delete call here */
  confirmDelete(): void {
    this.tripService.deleteTrip(this.code).subscribe({
      next: () => this.router.navigate(['']),        // on success go home
      error: err => this.errorMessage = err.message  // on error show message
    });
  }
}


