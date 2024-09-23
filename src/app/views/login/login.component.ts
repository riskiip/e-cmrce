import { ChangeDetectorRef, Component } from "@angular/core";
import { AuthService } from "../../layout/header/auth.service";
import { Router } from "@angular/router";
import { take } from "rxjs";

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
          this.getAllUser(response.username);
        }
      },
      error: (error) => {
        alert("Login failed");
      },
      complete: () => {
        this.showLoader = false;
      },
    });
  }

  getAllUser(email: string) {
    this.authService
      .getAllUser(email)
      .pipe(take(1))
      .subscribe((value) => {
        let profile: any;
        profile = value.results.filter(
          (profile: any) => profile.naran === email
        );
        sessionStorage.setItem("user", JSON.stringify(profile[0]));
        alert("Login success");
        this.router.navigate(["/"]);
      });
  }

  googleSignIn() {
    this.authService
      .googleSignIn()
      .then((result) => {
        // Redirect ke halaman "companypfe" setelah login berhasil
        this.router.navigate(["/companypfe"]);
      })
      .catch((error) => {});
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {})
      .catch((error) => {});
  }

  onSubmit() {
    // Add your form submission logic here
  }

  facebookSignIn() {
    // Add your Facebook sign-in logic here
  }
}
