import { Component, OnInit } from "@angular/core";
import { ProductService } from "../views/home/product.service";

@Component({
  selector: "app-item-detail",
  templateUrl: "./item-detail.component.html",
  styleUrl: "./item-detail.component.scss",
})
export class ItemDetailComponent implements OnInit {
  constructor(private productDataService: ProductService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log(this.productDataService.getDetailProduct());
  }
}
