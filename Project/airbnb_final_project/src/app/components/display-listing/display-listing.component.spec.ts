import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayListingComponent } from './display-listing.component';

describe('DisplayListingComponent', () => {
  let component: DisplayListingComponent;
  let fixture: ComponentFixture<DisplayListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayListingComponent]
    });
    fixture = TestBed.createComponent(DisplayListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
