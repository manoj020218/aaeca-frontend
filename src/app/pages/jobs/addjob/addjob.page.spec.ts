import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddjobPage } from './addjob.page';

describe('AddjobPage', () => {
  let component: AddjobPage;
  let fixture: ComponentFixture<AddjobPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddjobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
