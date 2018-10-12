import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarketsComponent } from './list-markets.component';

describe('ListMarketsComponent', () => {
  let component: ListMarketsComponent;
  let fixture: ComponentFixture<ListMarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
