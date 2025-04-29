import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:3000/api';
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,                // ← inject HttpClient
    private tripDataService: TripDataService // ← inject TripDataService
  ) { }

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

// Get our token from our Storage provider.
// NOTE: For this application we have decided that we will name
// the key for our token 'travlr-token'
public getToken(): string {
  let out: any;
  out = this.storage.getItem('travlr-token');
  // Make sure we return a string even if we don't have a token
  if(!out)
  {
  return '';
  }
  return out;
  }
  // Save our token to our Storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public saveToken(token: string): void {
  this.storage.setItem('travlr-token', token);
  }
  // Logout of our application and remove the JWT from Storage
  public logout(): void {
  this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if we are logged in and the token is
// still valid. Even if we have a token we will still have to
// reauthenticate if the token has expired
public isLoggedIn(): boolean {
  const token: string = this.getToken();
  if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.exp > (Date.now() / 1000);
} else {
return false;
}
}
// Retrieve the current user. This function should only be called
// after the calling method has checked to make sure that the user
// isLoggedIn.
public getCurrentUser(): User {
const token: string = this.getToken();
const { email, name } = JSON.parse(atob(token.split('.')[1]));
return { email, name } as User;
}

// Login method that leverages the login method in tripDataService
// Because that method returns an observable, we subscribe to the
// result and only process when the Observable condition is satisfied
// Uncomment the two console.log messages for additional debugging
// information.
public login(user: User, passwd: string): void {
  // now this.tripDataService is defined
  this.tripDataService.login(user, passwd)
    .subscribe({
      next: (value: AuthResponse) => {
        console.log(value);
        this.saveToken(value.token);
      },
      error: err => console.error(err)
    });
} 
  // Register method that leverages the register method in
  // tripDataService

  // Because that method returns an observable, we subscribe to the
// result and only process when the Observable condition is satisfied
// Uncomment the two console.log messages for additional debugging
// information. Please Note: This method is nearly identical to the
// login method because the behavior of the API logs a new user in
// immediately upon registration
public register(user: User, passwd: string): Observable<AuthResponse> {
  // this.http is now available
  return this.http.post<AuthResponse>(
    `${this.baseUrl}/register`,
    { name: user.name, email: user.email, password: passwd }
  );
}
}

