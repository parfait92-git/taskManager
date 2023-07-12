import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartArtComponent } from './chart-art.component';

describe('ChartArtComponent', () => {
  let component: ChartArtComponent;
  let fixture: ComponentFixture<ChartArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartArtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
