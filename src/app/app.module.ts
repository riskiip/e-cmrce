import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { RejistuComponent } from './views/rejistu/rejistu.component';
import { PublisidadeComponent } from './views/publisidade/publisidade.component';
import { CompanypfeComponent } from './views/companypfe/companypfe.component';
import { ForgotpssComponent } from './forgotpss/forgotpss.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environments/environments';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './search-result/search-result.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RejistuComponent,
    PublisidadeComponent,
    CompanypfeComponent,
    ForgotpssComponent,
    ItemDetailComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
