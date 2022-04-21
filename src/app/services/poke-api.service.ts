import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { PokeApiResponse, Pokemon, PokemonResponse, } from "../interfaces/poke-api.interface";

@Injectable({
  providedIn: "root",
})
export class PokeApiService {
  constructor(private http: HttpClient) {}

  public async getListPokemons({
    pageIndex = 1,
    pageSize = 5,
  }): Promise<PokeApiResponse> {
    try {
      const offSet = pageIndex * pageSize;

      return await this.http
        .get<PokeApiResponse>(
          `${environment.api}/pokemon?offset=${offSet}&limit=${pageSize}`
        )
        .toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  public getPokemon(url: string): Promise<Pokemon> {
    return this.http
      .get<PokemonResponse>(url)
      .pipe(map(this.adaptPokemon))
      .toPromise();
  }

  public async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      return await this.http
        .get<PokemonResponse>(`${environment.api}/pokemon/${name}`)
        .pipe(map(this.adaptPokemon))
        .toPromise();
    } catch (error) {}
  }

  public adaptPokemon(pokemon: PokemonResponse): Pokemon {
    return {
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      ability: pokemon.abilities[0].ability.name,
      type: pokemon.types[0].type.name,
      imageUrl: pokemon.sprites.other["official-artwork"].front_default,
      id: pokemon.id,
      weight: pokemon.weight,
    };
  }
}
