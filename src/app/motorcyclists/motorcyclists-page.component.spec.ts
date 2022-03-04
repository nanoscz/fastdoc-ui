import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorcyclistsPageComponent } from './motorcyclists-page.component';

describe('MotorcyclistsPageComponent', () => {
  let component: MotorcyclistsPageComponent;
  let fixture: ComponentFixture<MotorcyclistsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorcyclistsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorcyclistsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
