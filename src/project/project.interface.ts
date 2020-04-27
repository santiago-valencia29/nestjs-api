import { Document } from 'mongoose';

export interface Project extends Document {
  readonly name: String;
  readonly description: String;
  readonly category: String;
  readonly year: Number;
  readonly langs: String;
  readonly image: String;
}
