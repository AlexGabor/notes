import { PageNotFoundComponent } from './feature/page-not-found/page-not-found.component';
import { FileComponent } from './feature/file/file.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'path', children: [{ path: '**', component: FileComponent }] },
  { path: '',   redirectTo: '/path', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
