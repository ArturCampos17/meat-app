import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

// Define the routes for the 'about' module
const ROUTES: Routes = [
  { path: '', component: AboutComponent }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule, // You need to import CommonModule for directives like `ngIf`, `ngFor`, etc.
    RouterModule.forChild(ROUTES) // Import the routes for this module
  ],
  exports: [RouterModule] // Export RouterModule so the routes work in the lazy-loaded module
})
export class AboutModule { }
