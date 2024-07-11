import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../views/home/product.service'; // Double-check the path for ProductService
import { HttpClient } from '@angular/common/http';
import { ProdutuService } from '../../core/servises/produtu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
onImageError($event: ErrorEvent) {
throw new Error('Method not implemented.');
}
  products: any[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProdutuService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }

    this.productService.getData().subscribe(
      (data: any[]) => {
        console.log(data);
        this.products = data;
      },
      error => {
        console.error('Error fetching product data: ', error);
        // Handle the error as needed
      }
    );
  }

  navigateToCompanyProfile() {
    this.router.navigate(['/company-profile']); // Check if the route is correct
  }

  navigateToItemDetail(itemId: number) {
    console.log(`Navigating to item detail for item with ID: ${itemId}`);
    this.router.navigate(['/item-detail'], { queryParams: { id: itemId } });
  }
}
