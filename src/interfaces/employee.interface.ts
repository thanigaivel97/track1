import mongoose from "mongoose";

export interface Employee extends mongoose.Document {
  name: string;
  gender: string;
  height: number;
  weight: number;
  photo: string;
  depid : mongoose.Schema.Types.ObjectId;
}

