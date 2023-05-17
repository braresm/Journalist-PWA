import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioNewsComponent } from './radio-news.component';

describe('RadioNewsComponent', () => {
  let component: RadioNewsComponent;
  let fixture: ComponentFixture<RadioNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
