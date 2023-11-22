import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObituaryPage } from './obituary.page';

describe('ObituaryPage', () => {
  let component: ObituaryPage;
  let fixture: ComponentFixture<ObituaryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ObituaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
