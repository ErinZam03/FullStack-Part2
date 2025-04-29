import { Component }              from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router }                 from '@angular/router';
import { AuthenticationService }  from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm:  ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  private passwordsMatch(form: FormGroup) {
    return form.get('password')!.value === form.get('confirm')!.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) return;
    const { name, email, password } = this.signupForm.value;
    this.auth.register({ name, email }, password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => this.errorMessage = err.error?.message || 'Signup failed'
    });
  }
}
