import { Pipe, PipeTransform } from "@angular/core";
import { Pokemon } from 'src/app/interfaces/poke-api.interface';

@Pipe({
  name: "filterPokemonByName",
})
export class FilterPokemonByNamePipe implements PipeTransform {
  transform(value: Pokemon[], args: string): Pokemon[] {
    if (!args || args.length < 3) return value;

    return value.filter(({ name }) => {
      return name.toLowerCase().includes(args.toLowerCase());
    });
  }
}
