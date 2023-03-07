import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public foods: Food[] = [];
  public searchTag = true;

  constructor(private foodService: FoodService,private activatedRoute: ActivatedRoute){ }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      let foodsObservable: Observable<Food[]>;
      if(params['searchTerm'])
      {
        console.log('inside search');

        this.searchTag = false;
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      }
      else if(params['tag'])
      {
        this.searchTag = false;
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      }
      else
      {
        this.searchTag = true;
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    })
    if(this.searchTag)
        this.foodService.getAll().subscribe((res) => {
          this.foods = res;
        });


  }

}
