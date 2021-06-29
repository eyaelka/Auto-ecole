import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { CodedelarouteComponent } from './components/codedelaroute/codedelaroute.component';
import { PermisdeconduireComponent } from './components/permisdeconduire/permisdeconduire.component';
import { ContactComponent } from './components/contact/contact.component';
import { SinscrireComponent } from './components/sinscrire/sinscrire.component';
import { SeconnecterComponent } from './components/seconnecter/seconnecter.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { ForumComponent } from './components/forum/forum.component';
import { CalendrierComponent } from './components/permisdeconduire/calendrier/calendrier.component';
import { AddEventComponent } from './components/permisdeconduire/calendrier/add-event/add-event.component';


const routes: Routes = [
  {path: '' , component:AccueilComponent},
  {path: 'codedelaroute', component:CodedelarouteComponent, canActivate: [AuthGuard]},
  {path: 'permisdeconduire', component:PermisdeconduireComponent},
  {path:'calendrier', component:CalendrierComponent,canActivate: [AdminGuard]},
  {path: 'add-event', component:AddEventComponent,canActivate: [AdminGuard]},
  {path: 'contact', component:ContactComponent},
  {path: 'sinscrire', component:SinscrireComponent},
  {path: 'seconnecter', component:SeconnecterComponent},
  {path: 'profil', component:ProfilComponent },
  {path: 'forum', component:ForumComponent},
  { path: '**', component: AccueilComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
