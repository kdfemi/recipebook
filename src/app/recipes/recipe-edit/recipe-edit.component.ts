import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Subject, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {


  id:number;
  editMode = false
  recipeForm: FormGroup;
  recipeFormArray = new FormArray([]);
  subject =  new Subject<FormArray>();
  subjectSubscription:Subscription;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router:Router) { }

  ngOnInit() {
   
    this.subjectSubscription = this.subject.subscribe(
      (form:FormArray)=>{
        this.recipeFormArray = form;
      })

    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] !=null;
        this.initForm();
      });


  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath ='';
    let RecipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath
      RecipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(RecipeDescription,Validators.required),
        'ingredients': recipeIngredients
      }
    )
    this.subject.next((<FormArray>this.recipeForm.get('ingredients')))
  }

  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']
    // )
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else this.recipeService.addRecipe(this.recipeForm.value);
    this.onCancel();
  }
  onAddIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
    )
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredients(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  ngOnDestroy(): void {
    this.subjectSubscription.unsubscribe();
  } 
}
