import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { PokeApiLsService } from 'src/app/services/poke-api-ls.service';
import { Pokemon, ResultPokemon } from "../../interfaces/poke-api.interface";
import { PokeApiService } from "../../services/poke-api.service";

const INITIAL_PAGINATOR_VALUE = {
  length: 0,
  pageIndex: 0,
  pageSize: 5,
};

@Component({
  selector: "app-crud-pokemons",
  templateUrl: "./crud-pokemons.component.html",
  styleUrls: ["./crud-pokemons.component.scss"],
})
export class CrudPokemonsComponent implements OnInit {
  public length = 0;
  public pageSize = 0;

  public pokemons: Pokemon[] = [];

  constructor(private pokeApiService: PokeApiService, private pokeApiLsService: PokeApiLsService) {}

  public ngOnInit(): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    if (pokemons) {
      this.pokemons = pokemons;
    }
  }

  public getListPokemons(event: PageEvent): void {
    this.pokeApiService.getListPokemons(event).then((response) => {
      const { results, count } = response;

      this.getPokemons(results).then();
      this.pokeApiLsService.saveTotalPokemons(count);
      this.pokeApiLsService.savePageIndex(event.pageIndex);

      this.length = count;
    });
  }

  public async getPokemons(results: ResultPokemon[]) {
    try {
      this.pokemons = await Promise.all(
        results.map((result) => this.pokeApiService.getPokemon(result.url))
      );

      this.pokeApiLsService.addPokemonsLocalStorage(this.pokemons);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getPokemonByName(name: string): Promise<void> {
    try {
      if (!name) {
        return this.getListPokemons(INITIAL_PAGINATOR_VALUE);
      }

      const pokemon = await this.pokeApiService.getPokemonByName(name);

      this.pokemons = pokemon ? [pokemon] : [];

      this.pokeApiLsService.addPokemonsLocalStorage(this.pokemons);
    } catch (error) {}
  }
}
