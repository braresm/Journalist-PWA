import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineNewsComponent } from './online-news.component';

describe('OnlineNewsComponent', () => {
  let component: OnlineNewsComponent;
  let fixture: ComponentFixture<OnlineNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
