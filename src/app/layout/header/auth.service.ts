import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = "https://backendecomerce.apps06.tic.gov.tl/api/vizitor";

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  getUserName(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map((user) => (user ? user.displayName : null))
    );
  }

  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(map((user) => (user ? user.uid : null)));
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signIn(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/login/", data);
  }

  signUp(data: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/utilizador/", data);
  }

  googleSignIn() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider());
  }

  signOut() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => !!user));
  }
}
