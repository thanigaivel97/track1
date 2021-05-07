import { Department } from "../interfaces/department.interface";
import { Depart } from "../models/department.model";
import { WELCOME_MESSAGE } from "../constants/pokeApi.constants";

export class DepartmentService {
  public welcomeMessage(): string {
    return WELCOME_MESSAGE;
  }

  public findAll(): Promise<Department[]> {
    return Depart.find({}).exec();
  }

  public add(pokemon: Department): Promise<Department> {
    const newPokemon = new Depart(pokemon);
    return newPokemon.save();
  }

  public async delete(id: string) {
    const deletedPokemon: any = await Depart.findByIdAndDelete(
      { _id  : id },

    ).exec();

    if (!deletedPokemon) {
      throw new Error(`Pokemon with id '${id}' not found`);
    }

    return deletedPokemon;
  }

  public async update(id: string, pokemon: Department) {
    const updatedPokemon: any = await Depart.findByIdAndUpdate(
      { _id  : id },
      pokemon
    ).exec();

    if (!updatedPokemon) {
      throw new Error(`Pokemon with id '${id}' not found`);
    }

    return updatedPokemon;
  }
}
