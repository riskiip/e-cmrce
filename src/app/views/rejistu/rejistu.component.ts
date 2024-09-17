import { Component, HostListener, OnInit } from "@angular/core";
import { AuthService } from "../../layout/header/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../home/product.service";
import { forkJoin, take } from "rxjs";
import { Munisipiu } from "../../models/publisidadeDto";

@Component({
  selector: "app-rejistu",
  templateUrl: "./rejistu.component.html",
  styleUrl: "./rejistu.component.scss",
})
export class RejistuComponent implements OnInit {
  page = 1;
  isLoading = false;

  naran: string = "";
  naranEmprezariu: string = "";
  munisipiuRejistu: string = "";
  email: string = "";
  telemovel: string = "";
  password: string = "";
  confirmPassword: string = "";
  signUpForm!: NgForm;

  locations: Munisipiu[] = [
    {
      id: 0,
      naran: "",
    },
  ];

  fileName = "";
  fileSelected!: File;

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadItems();
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
    this.fileSelected = event.target.files[0];
    this.fileName = this.fileSelected.name;
  }

  signUp() {
    const formData: FormData = new FormData();
    formData.append("naran", this.naran);
    formData.append("naran_emprezariu", this.naranEmprezariu);
    formData.append("munisipiu", this.munisipiuRejistu);
    formData.append("telemovel", this.telemovel);
    formData.append("email", this.email);
    formData.append("image", this.fileSelected);
    formData.append("password", this.password);

    this.authService.signUp(formData).subscribe({
      next: (response) => {
        if (response) {
          alert("Registration success");
          this.router.navigate(["/login"]);
        }
      },
      error: (error) => {
        alert("Registration failed");
      },
    });
  }
}
