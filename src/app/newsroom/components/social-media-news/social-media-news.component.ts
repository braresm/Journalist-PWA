import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { NewsroomCategory } from '../../enums/newsroom-category';
import { Newsroom } from '../../interfaces/newsroom';
import { NewsroomService } from '../../services/newsroom.service';

@Component({
  selector: 'app-social-media-news',
  templateUrl: './social-media-news.component.html',
  styleUrls: ['./social-media-news.component.scss'],
})
export class SocialMediaNewsComponent implements OnInit {
  socialMediaNews$!: Observable<Newsroom[]>;

  constructor(
    private snackbarService: SnackbarService,
    private newsroomService: NewsroomService
  ) {}

  ngOnInit(): void {
    const category = NewsroomCategory.ONLINE;
    this.socialMediaNews$ = this.newsroomService.getNewsrooms(category);
  }

  onDeleteNews(newsroom: Newsroom): void {
    if (newsroom.id) {
      this.newsroomService.delete(newsroom.id);
      this.snackbarService.showSuccess('Online news has been deleted');
    }
  }
}
