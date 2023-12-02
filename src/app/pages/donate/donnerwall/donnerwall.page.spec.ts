import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonnerwallPage } from './donnerwall.page';

describe('DonnerwallPage', () => {
  let component: DonnerwallPage;
  let fixture: ComponentFixture<DonnerwallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DonnerwallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
