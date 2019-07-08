import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AppRoutingModule,
    ShoppingListModule,
    CoreModule
    
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
