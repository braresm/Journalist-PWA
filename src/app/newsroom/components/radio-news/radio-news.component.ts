import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { NewsroomCategory } from '../../enums/newsroom-category';
import { Newsroom } from '../../interfaces/newsroom';
import { NewsroomService } from '../../services/newsroom.service';

@Component({
  selector: 'app-radio-news',
  templateUrl: './radio-news.component.html',
  styleUrls: ['./radio-news.component.scss'],
})
export class RadioNewsComponent implements OnInit {
  radioNews$!: Observable<Newsroom[]>;

  constructor(
    private snackbarService: SnackbarService,
    private newsroomService: NewsroomService
  ) {}

  ngOnInit(): void {
    const category = NewsroomCategory.RADIO;
    this.radioNews$ = this.newsroomService.getNewsrooms(category);
  }

  onDeleteNews(newsroom: Newsroom): void {
    if (newsroom.id) {
      this.newsroomService.delete(newsroom.id);
      this.snackbarService.showSuccess('Radio news has been deleted');
    }
  }
}
