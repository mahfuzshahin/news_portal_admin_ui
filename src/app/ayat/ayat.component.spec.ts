import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyatComponent } from './ayat.component';

describe('AyatComponent', () => {
  let component: AyatComponent;
  let fixture: ComponentFixture<AyatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AyatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
