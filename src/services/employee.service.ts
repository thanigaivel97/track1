import { Employee } from "../interfaces/employee.interface";
import { Employ } from "../models/employee.model";
import { WELCOME_MESSAGE } from "../constants/pokeApi.constants";

export class EmployeeService {
    public welcomeMessage(): string {
        return WELCOME_MESSAGE;
    }

    public findAll(): Promise<Employee[]> {
        return Employ.find({}).exec();
    }
    public find(data : any): Promise<Employee[]> {
        return Employ.find(data).exec()
    }

    public add(pokemon: Employee): Promise<Employee> {
        const newPokemon = new Employ(pokemon);
        return newPokemon.save();
    }

    public async delete(id: string) {
        const deletedPokemon: any = await Employ.findByIdAndDelete(
            { _id: id },

        ).exec();

        if (!deletedPokemon) {
            throw new Error(`Pokemon with id '${id}' not found`);
        }

        return deletedPokemon;
    }

    public async update(id: string, pokemon: Employee) {
        const updatedPokemon: any = await Employ.findByIdAndUpdate(
            { _id: id },
            pokemon
        ).exec();

        if (!updatedPokemon) {
            throw new Error(`Employee with id '${id}' not found`);
        }

        return updatedPokemon;
    }
}
