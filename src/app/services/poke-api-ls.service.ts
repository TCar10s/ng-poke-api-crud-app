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

    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }

  public updatePokemonLocalStorage(pokemon: Pokemon): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    const index = pokemons.findIndex((p) => p.id === pokemon.id);

    if (index !== -1) {
      pokemons[index] = pokemon;
    }

    localStorage.setItem("pokemons", JSON.stringify(pokemons));
  }

  public addPokemonLocalStorage(pokemon: Pokemon): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    if (!pokemons) {
      localStorage.setItem("pokemons", JSON.stringify([pokemon]));
    } else {
      pokemons.push(pokemon);
      localStorage.setItem("pokemons", JSON.stringify(pokemons));
    }
  }

  public getPokemonsFromLocalStorage(): Pokemon[] {
    return JSON.parse(localStorage.getItem("pokemons"));
  }
}
