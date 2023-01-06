import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JwtAuthComponent } from './jwt-auth.component';

describe('JwtAuthComponent', () => {
  let component: JwtAuthComponent;
  let fixture: ComponentFixture<JwtAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JwtAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JwtAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
