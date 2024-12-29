import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCountComponent } from './database-count.component';

describe('DatabaseCountComponent', () => {
  let component: DatabaseCountComponent;
  let fixture: ComponentFixture<DatabaseCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
