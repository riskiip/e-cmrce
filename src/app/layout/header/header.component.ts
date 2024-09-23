import { Component, DoCheck, HostListener, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { Munisipiu } from "../../models/publisidadeDto";
import { ProductService } from "../../views/home/product.service";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, DoCheck {
  page = 1;
  isLoading = false;
  formData: any = {
    munisipiu: "",
  };
  // Constrcuct locations
  locations: Munisipiu[] = [
    {
      id: 0,
      naran: "",
    },
  ];
  item = "";

  userName: string | null = null;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private headerService: HeaderService,
    private productService: ProductService
  ) {}

  navigateToSearchResult(): void {}

  ngOnInit(): void {
    this.loadItems();
  }

  ngDoCheck(): void {
    this.userName = sessionStorage.getItem("emailUser");
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event: any) {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.isLoading
    ) {
      this.loadItems();
    }
  }

  loadItems() {
    this.isLoading = true;
    this.productService.getMunisipiu(this.page).subscribe((items) => {
      this.locations.push(...items.results);
      this.page++;
      this.isLoading = false;
    });
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
      .searchProduct(this.item, this.formData.munisipiu)
      .pipe(take(1))
      .subscribe((value) => {
        if (value.count !== 0) {
          localStorage.setItem("searchProduct", JSON.stringify(value));
          this.router.navigate(["/search-result"]);
        }
      });
  }
}
