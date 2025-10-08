import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CategoryService} from "../service/category.service";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  categories:any = [];
  constructor(private categoryService: CategoryService) {
  }
  ngOnInit(){
    this.getCategory();
  }

  getCategory(){
    this.categoryService.getCategory().subscribe((response:any)=>{
      this.categories = response.data;
    })
  }
}
