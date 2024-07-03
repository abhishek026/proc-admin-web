import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcwhitelableloginComponent } from './procwhitelablelogin.component';

describe('ProcwhitelableloginComponent', () => {
  let component: ProcwhitelableloginComponent;
  let fixture: ComponentFixture<ProcwhitelableloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcwhitelableloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcwhitelableloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
