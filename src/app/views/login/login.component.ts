import { ChangeDetectorRef, Component } from "@angular/core";
import { AuthService } from "../../layout/header/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  showLoader = false;
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  signIn() {
    this.showLoader = true;
    const formData: FormData = new FormData();
    formData.append("username", this.email);
    formData.append("password", this.password);

    this.authService.signIn(formData).subscribe({
      next: (response) => {
        if (response) {
          sessionStorage.setItem("emailUser", response.username);
          alert("Login success");
          this.router.navigate(["/"]);
        }
      },
      error: (error) => {
        console.log(error);
        alert("Login failed");
      },
      complete: () => {
        this.showLoader = false;
      }
    });
  }

  googleSignIn() {
    this.authService
      .googleSignIn()
      .then((result) => {
        console.log("Signed in with Google:", result);
        // Redirect ke halaman "companypfe" setelah login berhasil
        this.router.navigate(["/companypfe"]);
      })
      .catch((error) => {
        console.log("Google sign in error:", error);
      });
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log("Sign out error:", error);
      });
  }

  onSubmit() {
    // Add your form submission logic here
  }

  facebookSignIn() {
    // Add your Facebook sign-in logic here
  }
}
