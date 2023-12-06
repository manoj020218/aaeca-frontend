import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberformPage } from './memberform.page';

describe('MemberformPage', () => {
  let component: MemberformPage;
  let fixture: ComponentFixture<MemberformPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MemberformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
