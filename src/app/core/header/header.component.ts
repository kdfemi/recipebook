import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  constructor(private dataStorageService:DataStorageService, private authService:AuthService){}
  onSave(){
    this.dataStorageService.storeRecipes().subscribe(
      (res)=>{
        console.log(res);
      }
    );
  }

isAuthenticated(){
  return this.authService.isAuthenticated()
}
onFetch(){
    this.dataStorageService.fetechRecipes()
  }
  onLogout(){
    this.authService.logout()
  }
}
