import { Routes }               from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { LoginComponent }       from './login/login.component';
import { SignupComponent }      from './signup/signup.component';
import { AddTripComponent }     from './add-trip/add-trip.component';
import { EditTripComponent }    from './edit-trip/edit-trip.component';
import { DeleteTripComponent }  from './delete-trip/delete-trip.component';


export const routes: Routes = [
    { path: '',                  component: TripListingComponent, pathMatch: 'full' },
    { path: 'trips',             redirectTo: '' },
    { path: 'reservations',      component: ReservationsListComponent },
    { path: 'login',             component: LoginComponent },
    { path: 'signup',            component: SignupComponent },
    { path: 'add-trip',          component: AddTripComponent },
    { path: 'edit-trip/:code',   component: EditTripComponent },
    { path: 'delete-trip/:code', component: DeleteTripComponent }
    //{ path: '**',                redirectTo: '' }
];

