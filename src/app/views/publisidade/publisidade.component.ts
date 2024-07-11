import { Component } from "@angular/core";
import { ProductService } from "../home/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-publisidade",
  templateUrl: "./publisidade.component.html",
  styleUrls: ["./publisidade.component.scss"],
})
export class PublisidadeComponent {
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
  categories: any[] = [
    { text: "Kategoria 1", value: "1" },
    { text: "Kategoria 2", value: "2" },
  ];

  // Construct subcategories
  subCategories: any[] = [];

  // Constrcuct locations
  locations: any[] = [
    { text: "Aileu", value: "1" },
    { text: "Ainaru", value: "2" },
    { text: "Baucau", value: "3" },
  ];

  // Construct sublocations
  subLocations: any[] = [];

  // Construct post-administrative
  postoadministrativu: any[] = [];

  // Flag for show subcategory and postadministrative
  showSubkategori = false;
  showPostoadministrativu = false;

  // Declaration for file-name after user upload file
  fileName = "";

  constructor(private productService: ProductService, private router: Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.formData.imagem = file;
  }

  onKategoriChange(event: any) {
    const selectedKategoria = event.target.value;
    if (selectedKategoria === "1") {
      this.subCategories = [
        { text: "Subkategoria 1-1", value: "1" },
        { text: "Subkategoria 1-2", value: "2" },
      ];
    } else if (selectedKategoria === "2") {
      this.subCategories = [{ text: "Subkategoria 2-1", value: "3" }];
    }
    this.showSubkategori = this.subCategories.length > 0;
  }

  onLocationChange(event: any) {
    const selectedLocation = event.target.value;
    if (selectedLocation === "1") {
      this.postoadministrativu = [
        { text: "Postoadministrativu 1-1", value: "1" },
        { text: "Postoadministrativu 1-2", value: "2" },
      ];
    } else if (selectedLocation === "2") {
      this.postoadministrativu = [
        { text: "Postoadministrativu 2-1", value: "3" },
      ];
    }
    this.showPostoadministrativu = this.postoadministrativu.length > 0;
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

    formData.append("deskrisaun", deskrisaun);
    formData.append("kategoria", this.formData.kategoria);
    formData.append("munisipiu", this.formData.munisipiu);
    formData.append("postu", this.formData.postoAdministrativu);
    formData.append("subkategoria", this.formData.subkategoria);

    // Ensure price is a string
    formData.append("price", this.formData.price);

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
