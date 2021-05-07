import { Schema, model } from "mongoose";

import { Employee } from "../interfaces/employee.interface";

const EmployeeSchema = new Schema({
    name: { type: String },
    gender: { type: String },
    height: { type: Number },
    weight: { type: Number },
    photo: { type: String },
    depid: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    }
});

export const Employ = model<Employee>("employee", EmployeeSchema);
