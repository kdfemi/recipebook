import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';

@NgModule({

    declarations:[
        HeaderComponent,
        HomeComponent
    ],
    imports:[
        SharedModule,
        AppRoutingModule,
    ],
    exports:[
        HeaderComponent, 
        AppRoutingModule,

    ],
    providers:[ShoppingListService, RecipeService]
})
export class CoreModule{}