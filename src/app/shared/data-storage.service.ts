import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/Operators'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService) { }

  storeRecipes(){
    const token = this.authService.getToken()
    return this.http.put('https://ng-recipe-book-31179.firebaseio.com/recipes.json',this.recipeService.getRecipes())
  }

  fetechRecipes(){
    const token = this.authService.getToken()
    this.http.get('https://ng-recipe-book-31179.firebaseio.com/recipes.json?auth='+token)
    .pipe(map(
      (res:Recipe[])=>{
        for(let recipe of res){
          if(!recipe['ingredients']){
            recipe['ingredients'] = [];
          }
        }
        return res
      }
    ))
    .subscribe((res:Recipe[])=>{
      this.recipeService.setRecipes(res);
    });
  }
}
