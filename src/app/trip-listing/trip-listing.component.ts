import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { Router }       from '@angular/router';

import { Trip }               from '../models/trip';
import { TripDataService }    from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  fullTrips:     Trip[] = [];
  trips:         Trip[] = [];
  searchTerm     = '';
  currentCategory = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private auth: AuthenticationService
  ) {}
 
  ngOnInit() {
    this.tripDataService.getTrips().subscribe({
      next: (list: Trip[]) => {
        this.fullTrips = list;
        this.trips     = [...list];
      },
      error: err => console.error(err)
    });
  }

  onSearch() {
    this.applyFilters();
  }
  
  setCategory(cat: string) {
    this.currentCategory = cat.toLowerCase();       // store in lowercase
    this.applyFilters();
  }
  
  applyFilters() {
    const cat = this.currentCategory;               // already lowercase
    this.trips = this.fullTrips
      .filter(t => {
        if (!cat) return true;
        // use the safe-navigation operator in case someone forgot to seed category:
        return t.category?.toLowerCase() === cat;
      })
      .filter(t => {
        if (!this.searchTerm) return true;
        return t.name.toLowerCase()
                      .includes(this.searchTerm.toLowerCase());
      });
  }

  addTrip()             { this.router.navigate(['add-trip']); }
  editTrip(code: string){ this.router.navigate(['edit-trip', code]); }
  deleteTrip(code: string){ this.router.navigate(['delete-trip', code]); }

  isLoggedIn() { return this.auth.isLoggedIn(); }
}
