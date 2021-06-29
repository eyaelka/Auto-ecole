import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CalendrierComponent } from './components/permisdeconduire/calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';// a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CodedelarouteComponent } from './components/codedelaroute/codedelaroute.component';
import { PermisdeconduireComponent } from './components/permisdeconduire/permisdeconduire.component';
import { ContactComponent } from './components/contact/contact.component';
import { SinscrireComponent } from './components/sinscrire/sinscrire.component';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { SeconnecterComponent } from './components/seconnecter/seconnecter.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilComponent } from './components/profil/profil.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ForumComponent } from './components/forum/forum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEventComponent } from './components/permisdeconduire/calendrier/add-event/add-event.component';
import { FooterComponent } from './components/footer/footer.component';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
])


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccueilComponent,
    CodedelarouteComponent,
    PermisdeconduireComponent,
    ContactComponent,
    SinscrireComponent,
    SeconnecterComponent,
    ProfilComponent,
    ForumComponent,
    CalendrierComponent,
    AddEventComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    FullCalendarModule,



  ],
  providers: [ AuthService,
              AuthGuard,
              PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
