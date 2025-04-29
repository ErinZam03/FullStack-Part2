// src/app/app.module.ts
import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule }        from '@angular/router';

import { AppComponent }        from './app.component';
import { routes }              from './app.routes';

import { NavbarComponent }         from './navbar/navbar.component';
import { TripListingComponent }    from './trip-listing/trip-listing.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { LoginComponent }          from './login/login.component';
import { SignupComponent }         from './signup/signup.component';
import { AddTripComponent }        from './add-trip/add-trip.component';
import { EditTripComponent }       from './edit-trip/edit-trip.component';
import { DeleteTripComponent }     from './delete-trip/delete-trip.component';


@NgModule({
    declarations: [
      AppComponent,
      NavbarComponent,
      TripListingComponent,
      ReservationsListComponent,
      LoginComponent,
      SignupComponent,
      AddTripComponent,
      EditTripComponent,
      DeleteTripComponent
    ],
    imports: [
      BrowserModule,          // brings in NgIf/NgFor, date/currency pipes, etc.
      FormsModule,            // brings in ngModel
      HttpClientModule,
      RouterModule.forRoot(routes)
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule {}