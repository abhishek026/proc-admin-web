import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcloginComponent } from './proclogin.component';

describe('ProcloginComponent', () => {
  let component: ProcloginComponent;
  let fixture: ComponentFixture<ProcloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
