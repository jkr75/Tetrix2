import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponentComponent } from './game-page-component.component';

describe('GamePageComponentComponent', () => {
  let component: GamePageComponentComponent;
  let fixture: ComponentFixture<GamePageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamePageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
