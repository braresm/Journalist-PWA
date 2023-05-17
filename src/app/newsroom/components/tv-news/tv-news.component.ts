import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { NewsroomCategory } from '../../enums/newsroom-category';
import { Newsroom } from '../../interfaces/newsroom';
import { NewsroomService } from '../../services/newsroom.service';

@Component({
  selector: 'app-tv-news',
  templateUrl: './tv-news.component.html',
  styleUrls: ['./tv-news.component.scss'],
})
export class TvNewsComponent implements OnInit {
  tvNews$!: Observable<Newsroom[]>;

  constructor(
    private snackbarService: SnackbarService,
    private newsroomService: NewsroomService
  ) {}

  ngOnInit(): void {
    const category = NewsroomCategory.TV;
    this.tvNews$ = this.newsroomService.getNewsrooms(category);
  }

  onDeleteNews(newsroom: Newsroom): void {
    if (newsroom.id) {
      this.newsroomService.delete(newsroom.id);
      this.snackbarService.showSuccess('TV news has been deleted');
    }
  }
}
