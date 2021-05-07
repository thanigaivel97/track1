import { Schema, model } from "mongoose";

import { Department } from "../interfaces/department.interface";

const DepartmentSchema = new Schema({
    name: { type: String },
    strength: { type: String },
    location: { type: String },
    photo: { type: String },
});

export const Depart = model<Department>("department", DepartmentSchema);
