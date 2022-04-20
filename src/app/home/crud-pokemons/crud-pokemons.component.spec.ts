import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPokemonsComponent } from './crud-pokemons.component';

describe('CrudPokemonsComponent', () => {
  let component: CrudPokemonsComponent;
  let fixture: ComponentFixture<CrudPokemonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudPokemonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudPokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
