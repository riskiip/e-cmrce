import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { HeaderService } from "./header.service";
import { take } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  item = "";

  userName: string | null = null;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private headerService: HeaderService
  ) {}

  navigateToSearchResult(): void {
    this.router.navigate(["/search-result"]);
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userName = user.displayName;
      } else {
        this.userName = null;
      }
    });
  }

  redirectToProfilePage(): void {
    if (this.userName) {
      console.log("Mengalihkan ke halaman profil...");
      // Arahkan ke halaman "companypfe" jika pengguna sudah login
      this.router.navigate(["/companypfe"]);
    } else {
      console.log("Pengguna belum masuk. Mengalihkan ke halaman login...");
      // Arahkan ke halaman login jika pengguna belum login
      this.router.navigate(["/login"]);
    }
  }

  redirectToLogin(): void {
    console.log("Mengalihkan ke halaman login...");
    this.router.navigate(["/login"]);
  }

  logout(): void {
    this.auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully.");
        this.router.navigate(["/login"]);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  searchProduct() {
    this.headerService
      .searchProduct(this.item, 1)
      .pipe(take(1))
      .subscribe((value) => {
        console.log(value);
      });
  }
}
