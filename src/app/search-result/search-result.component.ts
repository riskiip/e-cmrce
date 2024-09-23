import { Component, OnInit } from "@angular/core";
import { ProductService } from "../views/home/product.service";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrl: "./search-result.component.scss",
})
export class SearchResultComponent implements OnInit {
  constructor(private productDataService: ProductService) {}

  detailProductString!: any;
  detailProductObj!: any;

  navigateToCompanyProfile() {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.detailProductString = localStorage.getItem("searchProduct");
    this.detailProductObj = JSON.parse(this.detailProductString);
  }

  gotoDetailProduct(event: any) {
    this.productDataService.sendDetailProduct(event);
    localStorage.setItem("detailProduct", JSON.stringify(event));
  }
}
