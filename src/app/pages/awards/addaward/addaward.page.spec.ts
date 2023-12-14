import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddawardPage } from './addaward.page';

describe('AddawardPage', () => {
  let component: AddawardPage;
  let fixture: ComponentFixture<AddawardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddawardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
