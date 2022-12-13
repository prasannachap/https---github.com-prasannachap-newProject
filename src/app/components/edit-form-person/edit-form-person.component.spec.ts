import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormPersonComponent } from './edit-form-person.component';

describe('EditFormPersonComponent', () => {
  let component: EditFormPersonComponent;
  let fixture: ComponentFixture<EditFormPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFormPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
