import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import {MockModule} from 'ng-mocks';
import {MaterialModule} from '../../../material/material.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from '@angular/material/snack-bar';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  class MatSnackBarRefMock {
    close(): void {}
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
          { provide: MAT_SNACK_BAR_DATA, useValue: {}},
          { provide: MatSnackBarRef, useClass: MatSnackBarRefMock}
         ],
      imports: [ MockModule(MaterialModule), MockModule(MatTooltipModule), MockModule(MatSnackBarModule) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
