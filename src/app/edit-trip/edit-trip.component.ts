import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  public trip!: Trip;
  public submitted = false;
  public message = '';

  constructor(
    private formBuilder: FormBuilder,
    private router:       Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert(`Couldn't find a tripCode to edit`);
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id:         [],
      code:        [tripCode, Validators.required],
      name:        ['',     Validators.required],
      length:      ['',     Validators.required],
      start:       ['',     Validators.required],
      resort:      ['',     Validators.required],
      perPerson:   ['',     Validators.required],
      image:       ['',     Validators.required],
      description: ['',     Validators.required]
    });

    this.tripDataService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value[0];
          this.editForm.patchValue(value[0]);
          this.message = `Trip ${tripCode} retrieved`;
        },
        error: (err: any) => {
          console.error('Error fetching trip:', err);
          this.message = 'Error retrieving trip data';
        }
      });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: (updated: any) => {
            console.log('Updated trip:', updated);
            this.router.navigate(['']);
          },
          error: (err: any) => {
            console.error('Error updating trip:', err);
            this.message = 'Update failed';
          }
        });
    }
  }

  public get f() {
    return this.editForm.controls;
  }
}
