import { NgModule } from '@angular/core';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RouterModule, Routes, PreloadAllModules} from '@angular/router'
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomeComponent } from '../core/home/home.component';
const appRoutes:Routes = [

  {path:'', component:HomeComponent, pathMatch:'full'},
  {path: 'recipes', loadChildren: '../recipes/recipes.module#RecipeModule'},
  {path:'shopping-list', component:ShoppingListComponent},
  {path: '**', component:PageNotFoundComponent}

]
@NgModule({

  imports: [
    
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
