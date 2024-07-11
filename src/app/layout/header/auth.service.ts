import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  getUserName(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.displayName : null)
    );
  }

  getUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map(user => user ? user.uid : null)
    );
  }

  login(email: string, password: string): Promise<any> { 
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
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
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }
}
