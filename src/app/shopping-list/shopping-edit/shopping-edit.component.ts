import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { parseCookieValue } from '@angular/common/src/cookie';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

@ViewChild('f') slForm: NgForm;
  subscription:Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription= this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(form:NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else this.slService.addIngredient(newIngredient);
    this.onClear();
  }

  onClear(){
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    this.slService.DeleteIngredient(this.editedItemIndex);
    this.onClear()
  }
  ngOnDestroy(): void {

   this.subscription.unsubscribe();
  }
  

}
