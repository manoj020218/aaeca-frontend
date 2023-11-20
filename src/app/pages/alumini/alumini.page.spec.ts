import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AluminiPage } from './alumini.page';

describe('AluminiPage', () => {
  let component: AluminiPage;
  let fixture: ComponentFixture<AluminiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AluminiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
