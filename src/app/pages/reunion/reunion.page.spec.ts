import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReunionPage } from './reunion.page';

describe('ReunionPage', () => {
  let component: ReunionPage;
  let fixture: ComponentFixture<ReunionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReunionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
