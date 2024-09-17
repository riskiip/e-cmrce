import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, take } from "rxjs";
import {
  Kategoria,
  Munisipiu,
  Postu,
  Subkategoria,
} from "../../models/publisidadeDto";
import { ProductService } from "../home/product.service";
import dayjs from "dayjs";

@Component({
  selector: "app-publisidade",
  templateUrl: "./publisidade.component.html",
  styleUrls: ["./publisidade.component.scss"],
})
export class PublisidadeComponent implements OnInit {
  page = 1;
  isLoading = false;

  // Construct formData object
  formData: any = {
    titlu: "",
    telemovel: "",
    imagem: null,
    deskrisaun: "",
    kategoria: "",
    munisipiu: "",
    price: null,
    postoAdministrativu: "",
    subkategoria: "",
  };

  // Construct categories
  categories: Kategoria[] = [
    {
      id: 0,
      naran: "",
    },
  ];

  // Construct subcategories
  subCategories: Subkategoria[] = [
    {
      id: 0,
      naran: "",
      kategoria: {
        id: 0,
        naran: "",
      },
      kategoria_id: 0,
    },
  ];

  filterSubCategory: any;

  // Constrcuct locations
  locations: Munisipiu[] = [
    {
      id: 0,
      naran: "",
    },
  ];

  filterMunisipiu: any;

  // Construct sublocations
  subLocations: any[] = [];

  // Construct post-administrative
  postoadministrativu: Postu[] = [
    {
      id: 0,
      naran: "",
      munisipiu: {
        id: 0,
        naran: "",
      },
      munisipiu_id: 0,
    },
  ];

  // Flag for show subcategory and postadministrative
  showSubkategori = false;
  showPostoadministrativu = false;

  // Declaration for file-name after user upload file
  fileName = "";

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadItems();
    forkJoin([
      this.productService.getKategoria(),
      this.productService.getSubKategoria(),
      this.productService.getPostu(),
    ])
      .pipe(take(1))
      .subscribe((response) => {
        this.categories = response[0];
        this.subCategories = response[1].results;
        this.postoadministrativu = response[2].results;
      });
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.formData.imagem = file;
  }

  onKategoriChange(event: any) {
    const selectedKategoria = event.target.value;
    this.filterSubCategory = this.subCategories.filter(
      (data) => data.kategoria_id === parseInt(selectedKategoria)
    );
    this.showSubkategori = this.filterSubCategory.length > 0;
  }

  onLocationChange(event: any) {
    const selectedLocation = event.target.value;
    this.filterMunisipiu = this.postoadministrativu.filter(
      (data) => data.munisipiu_id === parseInt(selectedLocation)
    );
    this.showPostoadministrativu = this.filterMunisipiu.length > 0;
  }

  postDataToAPI() {
    // Convert the values to integer and check for valid data
    const deskrisaun = this.formData.deskrisaun
      ? this.formData.deskrisaun.trim()
      : "";

    // Form validation checks
    if (!deskrisaun || deskrisaun.length === 0) {
      alert("Deskrisaun field cannot be empty.");
      return;
    }

    if (this.formData.kategoria.length > 1) {
      alert("Kategoria should be a valid integer ID.");
      return;
    }

    if (this.formData.munisipiu.length > 1) {
      alert("Munisipiu should be a valid integer ID.");
      return;
    }
    const formData: FormData = new FormData();
    formData.append("titlu", this.formData.titlu);
    formData.append("telemovel", this.formData.telemovel);

    // Make sure the image is a File object
    if (this.formData.imagem) {
      formData.append("imagem", this.formData.imagem);
    }
    formData.append("datapublika", dayjs().format("YYYY-MM-DD"));
    formData.append("deskrisaun", deskrisaun);
    formData.append("kategoria_id", this.formData.kategoria);
    formData.append("munisipiu_id", this.formData.munisipiu);
    formData.append("postu_id", this.formData.postoAdministrativu);
    formData.append("subkategoria_id", this.formData.subkategoria);

    // Ensure price is a string
    formData.append("presu", this.formData.price);

    this.productService.postData(formData).subscribe({
      next: (response) => {
        if (response) {
          alert("Success");
          this.router.navigate(["/"]);
        }
      },
      error: (error) => {
        console.error("Error posting data to API:", error);
        if (error.error) {
          console.error("Server returned error:", error.error);
        }
        alert("An error occurred while posting data. Please try again later.");
      },
    });
  }
}
