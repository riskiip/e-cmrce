import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  private apiUrl =
    "https://backendecomerce.apps06.tic.gov.tl/api/vizitor/produtu/?query=";

  constructor(private http: HttpClient) {}

  searchProduct(item: string, munisipiuId: number): Observable<any> {
    let removeSpaceFromItem = item.split(" ").join("%20");
    console.log(removeSpaceFromItem);
    return this.http
      .get<any>(this.apiUrl + removeSpaceFromItem + "&munisipiu=" + munisipiuId)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error("An error occurred:", error);

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error("An error occurred:", error.error.message);
    } else {
      // Server-side error
      console.error(
        `Server returned code: ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError(
      () => new Error("Something bad happened; please try again later.")
    );
  }
}
