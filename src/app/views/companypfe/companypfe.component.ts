import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../layout/header/auth.service";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-companypfe",
  templateUrl: "./companypfe.component.html",
  styleUrls: ["./companypfe.component.scss"],
})
export class CompanypfeComponent implements OnInit {
  userName: string | null = null;
  userId: string | null = null;
  profileUserId: string = "someProfileUserId";
  cardOwnerId: string = "someCardOwnerId";
  showPostoadministrativu: boolean = false;
  postoadministrativu: any[] = [];
  isLoggedIn: boolean = false;
  isModalOpen = false;
  profileImageSrc: string =
    "https://bootdey.com/img/Content/avatar/avatar7.png";

  userProfile!: any;
  objUser!: any;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userProfile = sessionStorage.getItem("user");
    this.objUser = JSON.parse(this.userProfile)[0];
    this.profileImageSrc = this.objUser.image;
    this.updateLoginStatus();
    window.scrollTo(0, 0);

    this.authService.getUserName().subscribe((userName) => {
      this.userName = userName;
      this.cdr.detectChanges();
    });

    this.authService.getUserId().subscribe((userId) => {
      this.userId = userId;
      this.cdr.detectChanges();
    });
  }

  updateLoginStatus(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges();
    });
  }

  onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageSrc = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  openModal() {
    if (this.isLoggedIn) {
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onLocationChange(event: any) {
    const selectedLocation = event.target.value;
    this.postoadministrativu = [];

    if (selectedLocation === "location") {
      this.addPostoadministrativuOption(
        "Postoadministrativu 1",
        "postoadministrativu1"
      );
      this.addPostoadministrativuOption(
        "Postoadministrativu 2",
        "postoadministrativu2"
      );
    } else if (selectedLocation === "location1") {
      this.addPostoadministrativuOption(
        "Postoadministrativu 1",
        "postoadministrativu1"
      );
      this.addPostoadministrativuOption(
        "Postoadministrativu 2",
        "postoadministrativu2"
      );
    } else if (selectedLocation === "location2") {
      this.addPostoadministrativuOption(
        "Postoadministrativu 1",
        "postoadministrativu1"
      );
      this.addPostoadministrativuOption(
        "Postoadministrativu 2",
        "postoadministrativu2"
      );
    } else if (selectedLocation === "location3") {
      this.addPostoadministrativuOption(
        "Postoadministrativu 3",
        "postoadministrativu1"
      );
      this.addPostoadministrativuOption(
        "Postoadministrativu 4",
        "postoadministrativu2"
      );
    }

    this.showPostoadministrativu = true;
  }

  addPostoadministrativuOption(text: string, value: string) {
    this.postoadministrativu.push({ text, value });
  }

  onSublocationChange(event: any) {
    const selectedSublocation = event.target.value;
  }
}
