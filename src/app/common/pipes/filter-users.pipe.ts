import { Pipe, PipeTransform } from "@angular/core";
import { User } from 'src/app/interfaces/api-user.interface';

@Pipe({
  name: "filterUserByName",
})
export class FilterUserByNamePipe implements PipeTransform {
  transform(value: User[], args: string): User[] {
    if (!args || args.length < 3) return value;

    return value.filter(({ first_name }) => {
      return first_name.toLowerCase().includes(args.toLowerCase());
    });
  }
}
