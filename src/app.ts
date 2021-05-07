import { MONGO_URL } from "./constants/pokeApi.constants";
import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./services/department.service";

import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./services/employee.service";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private setControllers() {
    const departmentController = new DepartmentController(new DepartmentService());
    const employeeController = new EmployeeController(new EmployeeService());
    this.app.use("/department", departmentController.router);
    this.app.use('/employee' , employeeController.router)
  }
}

export default new App().app;
