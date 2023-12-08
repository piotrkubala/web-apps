import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsViewerComponent } from './topics-viewer.component';

describe('TopicsViewerComponent', () => {
  let component: TopicsViewerComponent;
  let fixture: ComponentFixture<TopicsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicsViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
