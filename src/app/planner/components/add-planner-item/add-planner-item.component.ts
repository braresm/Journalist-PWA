import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Feed } from '../../interfaces/feed';
import { PlannerItem } from '../../interfaces/planner-item';
import { FeedService } from '../../services/feed.service';

@Component({
  selector: 'app-add-planner-item',
  templateUrl: './add-planner-item.component.html',
  styleUrls: ['./add-planner-item.component.scss'],
})
export class AddPlannerItemComponent implements OnInit {
  options: Feed[] = [];
  filteredOptions!: Observable<Feed[]>;

  type = new FormControl('', [Validators.required]);
  title = new FormControl('', [Validators.required]);
  date = new FormControl(new Date(), [Validators.required]);
  author = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  contactPerson = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  feedTopic = new FormControl<Feed>({} as Feed, [Validators.required]);

  addPlannerForm = new FormGroup({
    type: this.type,
    title: this.title,
    date: this.date,
    author: this.author,
    location: this.location,
    contactPerson: this.contactPerson,
    category: this.category,
    feedTopic: this.feedTopic,
  });

  private isEdit: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<AddPlannerItemComponent>,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: { plannerItem: PlannerItem },
    private feedService: FeedService
  ) {}

  ngOnInit(): void {
    this.feedService.getFeeds().subscribe((data) => {
      this.options = data;

      if (this.data.plannerItem) {
        this.isEdit = true;
        this.setFormData(this.data.plannerItem);
      }

      this.filteredOptions = this.feedTopic.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const name = typeof value === 'string' ? value : '';
          return name ? this.filterFeeds(name as string) : this.options.slice();
        })
      );
    });
  }

  onAddPlannerItem(): void {
    this.dialogRef.close({
      ...this.data.plannerItem,
      ...this.addPlannerForm.value,
      ...{ isEdit: this.isEdit },
    });
  }

  displayTopic(feed: Feed): string {
    return feed && feed.title ? feed.title : '';
  }

  private setFormData(plannerItem: PlannerItem): void {
    this.addPlannerForm.get('type')?.setValue(plannerItem.type);
    this.addPlannerForm.get('title')?.setValue(plannerItem.title);
    this.addPlannerForm
      .get('date')
      ?.setValue(new Date(plannerItem.date.seconds * 1000));
    this.addPlannerForm.get('author')?.setValue(plannerItem.author);
    this.addPlannerForm.get('location')?.setValue(plannerItem.location);
    this.addPlannerForm
      .get('contactPerson')
      ?.setValue(plannerItem.contactPerson);
    this.addPlannerForm.get('category')?.setValue(plannerItem.category);

    const plannerFeed = this.getFeedTopic(this.options, plannerItem.feedId);
    if (plannerFeed) {
      this.addPlannerForm.get('feedTopic')?.setValue(plannerFeed);
    }
  }

  private filterFeeds(title: string): Feed[] {
    const filterValue = title.toLowerCase();

    return this.options.filter((option) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }

  private getFeedTopic(feeds: Feed[], plannerFeedId: string): Feed | null {
    return feeds.find((feed) => feed.id === plannerFeedId) || null;
  }
}
