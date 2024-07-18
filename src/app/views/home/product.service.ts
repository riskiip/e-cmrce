import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private apiUrl = "https://backendecomerce.apps06.tic.gov.tl/api/vizitor";
  productDetail = new Subject();

  constructor(private http: HttpClient) {}

  sendDetailProduct(item: any) {
    this.productDetail.next(item);
  }

  getDetailProduct(): Observable<any> {
    return this.productDetail.asObservable();
  }

  postData(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/produtu/", data);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/produtu/");
  }

  getKategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/kategoria/");
  }

  getSubKategoria(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/subkategoria/");
  }

  getMunisipiu(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/munisipiu/");
  }

  getPostu(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/postu/");
  }
}
