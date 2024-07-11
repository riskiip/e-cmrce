import { Component } from '@angular/core';
import { AuthService } from '../../layout/header/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rejistu',
  templateUrl: './rejistu.component.html',
  styleUrl: './rejistu.component.scss'
})
export class RejistuComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  signUpForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) { }

  signUp() {
    this.authService.signUp(this.email, this.password)
      .then(() => {
        console.log('Rejistu susesu!');
        alert('Rejistu susesu!');
        this.router.navigate(['/companypfe']); 
      })
      .catch(error => {
        console.error('Registrasi falha:', error.message);
        alert('Rejistu falha: ' + error.message); 
      });
  }
}
