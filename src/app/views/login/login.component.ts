import { Component } from '@angular/core';
import { AuthService } from '../../layout/header/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  
  signIn(email: string, password: string) {
    this.authService.signIn(email, password)
      .then((result) => {
        console.log('Signed in successfully:', result);
        this.router.navigate(['/companypfe'])
      })
      .catch((error) => {
        console.error('Sign in error:', error);
        console.log('Sign in error:', error);
      }); 
  }

  signUp() {
    this.authService.signUp(this.email, this.password)
      .then(result => {
        console.log('Signed up successfully:', result);
      })
      .catch(error => {
        console.log('Sign up error:', error);
      });
  }

  googleSignIn() {
    this.authService.googleSignIn()
      .then(result => {
        console.log('Signed in with Google:', result);
        // Redirect ke halaman "companypfe" setelah login berhasil
        this.router.navigate(['/companypfe']);
      })
      .catch(error => {
        console.log('Google sign in error:', error);
      });
  } 

  signOut() {
    this.authService.signOut()
      .then(() => {
        console.log('Signed out successfully');
      })
      .catch(error => {
        console.log('Sign out error:', error);
      });
  }

  onSubmit() {
    // Add your form submission logic here
  }

  facebookSignIn() {
    // Add your Facebook sign-in logic here
  }
}
