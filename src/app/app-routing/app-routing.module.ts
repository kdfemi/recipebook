import { NgModule } from '@angular/core';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RouterModule} from '@angular/router'
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
const routes = [
  {path:'', redirectTo: '/recipes', pathMatch:'full'},
  {path:'shopping-list', component:ShoppingListComponent, children:[
    {path:':id', component:RecipesComponent}
  ]},
  {path:'recipes', component:RecipesComponent, children:[
    {path:'', component:RecipeStartComponent},
    {path:'new', component:RecipeEditComponent},
    {path:':id', component:RecipeDetailComponent},
    {path:':id/edit', component:RecipeEditComponent},
    
    
  ]}
]
@NgModule({

  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
