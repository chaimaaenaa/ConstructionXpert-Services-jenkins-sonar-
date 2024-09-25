import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RessourceComponent } from './ressource.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: RessourceComponent },
  { path: 'add',component:AddComponent},
  { path: 'view/:id',component:ViewComponent},
  { path: 'delete/:id',component:DeleteComponent},
  { path: 'edit/:id',component:EditComponent},
  { path: '**', component:PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RessourceRoutingModule { }
