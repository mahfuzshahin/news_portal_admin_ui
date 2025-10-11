import {Component, OnInit} from '@angular/core';
import {NewsService} from "../service/configuration/news.service";
import {ActivatedRoute} from "@angular/router";
import {News} from "../model/news";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-news-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-view.component.html',
  styleUrl: './news-view.component.css'
})
export class NewsViewComponent implements OnInit{
  news:any = new News();
  constructor(private newsService: NewsService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.viewNews();
  }
  viewNews(){
    this.route.params.subscribe((params)=>{
      const newsId = +params['id'];
      this.newsService.getViewNews(newsId).subscribe((response:any)=>{
        this.news = response.data;
      });
    })
  }
}
