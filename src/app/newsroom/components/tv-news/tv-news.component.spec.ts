import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvNewsComponent } from './tv-news.component';

describe('TvNewsComponent', () => {
  let component: TvNewsComponent;
  let fixture: ComponentFixture<TvNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
