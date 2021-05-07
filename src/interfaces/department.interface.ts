import { Document } from "mongoose";

export interface Department extends Document {
  name: string;
  strength: string;
  location: string;
  photo: string;
}
