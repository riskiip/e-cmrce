import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrl: "./search-result.component.scss",
})
export class SearchResultComponent implements OnInit {
  detailProductString!: any;
  detailProductObj!: any;

  navigateToCompanyProfile() {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.detailProductString = localStorage.getItem("searchProduct");
    this.detailProductObj = JSON.parse(this.detailProductString);
    console.log(this.detailProductObj);
  }
}
