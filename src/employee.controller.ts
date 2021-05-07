import { Request, Response, Router } from "express";

import { EmployeeService } from "./services/employee.service";

export class EmployeeController {
  public router = Router();

  constructor(private employeeService: EmployeeService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.sayHello).post(this.add);

    this.router.route("/all").get(this.findAll);

    this.router.route("/:id").delete(this.delete).put(this.update);

    this.router.route('/findbydep').get(this.getBasedOndep)
  }

  private sayHello = (_: Request, res: Response) => {
    const welcomeMessage = this.employeeService.welcomeMessage();
    res.send(welcomeMessage);
  };

  private findAll = async (_: Request, res: Response) => {
    try {
      const pokemon = await this.employeeService.findAll();
      res.send(pokemon);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private add = async (req: Request, res: Response) => {
    try {
      const addPokemonResult = await this.employeeService.add(req.body);
      res.send(addPokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private delete = async (req: Request, res: Response) => {
    try {
      const deletePokemonResult = await this.employeeService.delete(
        req.params.id
      );
      res.send(deletePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  private update = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.employeeService.update(
        req.params.id,
        req.body
      );
      res.send(updatePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
  private getBasedOndep = async (req: Request, res: Response) => {
    try {
      const updatePokemonResult = await this.employeeService.find(
        {depid : req.query.depid}
      );
      res.send(updatePokemonResult);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}
