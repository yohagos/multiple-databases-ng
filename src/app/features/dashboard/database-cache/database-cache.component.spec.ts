import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCacheComponent } from './database-cache.component';

describe('DatabaseCacheComponent', () => {
  let component: DatabaseCacheComponent;
  let fixture: ComponentFixture<DatabaseCacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseCacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseCacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
