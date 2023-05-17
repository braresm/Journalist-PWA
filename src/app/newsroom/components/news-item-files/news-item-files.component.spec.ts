import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsItemFilesComponent } from './news-item-files.component';

describe('NewsItemFilesComponent', () => {
  let component: NewsItemFilesComponent;
  let fixture: ComponentFixture<NewsItemFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsItemFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsItemFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
