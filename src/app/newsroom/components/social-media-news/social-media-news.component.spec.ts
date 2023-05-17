import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaNewsComponent } from './social-media-news.component';

describe('SocialMediaNewsComponent', () => {
  let component: SocialMediaNewsComponent;
  let fixture: ComponentFixture<SocialMediaNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
