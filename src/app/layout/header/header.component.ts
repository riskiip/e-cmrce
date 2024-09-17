import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { HeaderService } from "./header.service";
import { take } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, DoCheck {
  item = "";

  userName: string | null = null;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private headerService: HeaderService
  ) {}

  navigateToSearchResult(): void {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.userName = sessionStorage.getItem("emailUser");
  }

  redirectToProfilePage(): void {
    if (this.userName) {
      // Arahkan ke halaman "companypfe" jika pengguna sudah login
      this.router.navigate(["/companypfe"]);
    } else {
      // Arahkan ke halaman login jika pengguna belum login
      this.router.navigate(["/login"]);
    }
  }

  redirectToLogin(): void {
    this.router.navigate(["/login"]);
  }

  logout(): void {
    sessionStorage.removeItem("emailUser");
    sessionStorage.removeItem("user");
    window.location.reload();
  }

  searchProduct() {
    this.headerService
      .searchProduct(this.item, 2)
      .pipe(take(1))
      .subscribe((value) => {
        if (value.count !== 0) {
          localStorage.setItem("searchProduct", JSON.stringify(value));
          this.router.navigate(["/search-result"]);
        }
      });
  }
}
