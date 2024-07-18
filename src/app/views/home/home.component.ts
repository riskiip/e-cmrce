import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { ProdutuService } from "../../core/servises/produtu.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  onImageError($event: ErrorEvent) {
    throw new Error("Method not implemented.");
  }
  products!: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProdutuService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }

    this.productService
      .getData()
      .pipe(take(1))
      .subscribe(
        (data) => {
          this.products = data.results;
        },
        (error) => {
          console.error("Error fetching product data: ", error);
        }
      );
  }

  navigateToCompanyProfile() {
    this.router.navigate(["/company-profile"]); // Check if the route is correct
  }

  navigateToItemDetail(itemId: number) {
    console.log(`Navigating to item detail for item with ID: ${itemId}`);
    this.router.navigate(["/item-detail"], { queryParams: { id: itemId } });
  }
}
