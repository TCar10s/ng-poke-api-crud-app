import { Injectable } from "@angular/core";
import { Pokemon } from "../interfaces/poke-api.interface";

@Injectable({ providedIn: "root" })
export class PokeApiLsService {
  constructor() {}

  public deletePokemonLocalStorage(pokemon: Pokemon): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    const index = pokemons.findIndex((p) => p.id === pokemon.id);

    if (index !== -1) {
      pokemons.splice(index, 1);
    }

    this.save("pokemons", pokemons);
  }

  public updatePokemonLocalStorage(pokemon: Pokemon): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    const index = pokemons.findIndex((p) => p.id === pokemon.id);

    if (index !== -1) {
      pokemons[index] = pokemon;
    }

   this.save("pokemons", pokemons);
  }

  public addPokemonLocalStorage(pokemon: Pokemon): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    if (!pokemons) {
      localStorage.setItem("pokemons", JSON.stringify([pokemon]));
    } else {
      pokemons.push(pokemon);
     this.save("pokemons", pokemons);
    }
  }

  public addPokemonsLocalStorage(pokemon: Pokemon[]): void {
    localStorage.setItem("pokemons", JSON.stringify(pokemon));
  }

  public getPokemonsFromLocalStorage(): Pokemon[] {
    return JSON.parse(localStorage.getItem("pokemons"));
  }

  public save(key: string, value: any | any[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
