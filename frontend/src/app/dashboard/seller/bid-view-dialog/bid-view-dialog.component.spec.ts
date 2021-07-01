import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidViewDialogComponent } from './bid-view-dialog.component';

describe('BidViewDialogComponent', () => {
  let component: BidViewDialogComponent;
  let fixture: ComponentFixture<BidViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
