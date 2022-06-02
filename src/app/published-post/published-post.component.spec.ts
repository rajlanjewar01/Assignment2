import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedPostComponent } from './published-post.component';

describe('PublishedPostComponent', () => {
  let component: PublishedPostComponent;
  let fixture: ComponentFixture<PublishedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
