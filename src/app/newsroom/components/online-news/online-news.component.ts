import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { NewsroomCategory } from '../../enums/newsroom-category';
import { Newsroom } from '../../interfaces/newsroom';
import { NewsroomService } from '../../services/newsroom.service';

@Component({
  selector: 'app-online-news',
  templateUrl: './online-news.component.html',
  styleUrls: ['./online-news.component.scss'],
})
export class OnlineNewsComponent implements OnInit {
  onlineNews$!: Observable<Newsroom[]>;

  constructor(
    private snackbarService: SnackbarService,
    private newsroomService: NewsroomService
  ) {}

  ngOnInit(): void {
    const category = NewsroomCategory.ONLINE;
    this.onlineNews$ = this.newsroomService.getNewsrooms(category);
  }

  onDeleteNews(newsroom: Newsroom): void {
    if (newsroom.id) {
      this.newsroomService.delete(newsroom.id);
      this.snackbarService.showSuccess('Online news has been deleted');
    }
  }
}
