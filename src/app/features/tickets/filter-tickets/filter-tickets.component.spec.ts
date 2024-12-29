import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTicketsComponent } from './filter-tickets.component';

describe('FilterTicketsComponent', () => {
  let component: FilterTicketsComponent;
  let fixture: ComponentFixture<FilterTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
