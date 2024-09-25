import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import {Resource} from "../models/ressource";

const routes: Routes = [

   { path: '',
     component: DashboardComponent,
     children:[
   { path: 'projet',
     loadChildren: () => import('./projet/projet.module').then(m => m.ProjetModule)
    },
   { path: 'task',
     loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
    },
   { path: 'ressource',
     loadChildren: () => import('./ressource/ressource.module').then(m => m.RessourceModule)
    },
]
  },
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
