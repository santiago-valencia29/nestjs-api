import { Document } from 'mongoose';

export interface Ferreteria extends Document {
  readonly nombre: String;
  readonly precio: number;
  readonly proveedor: String;
  readonly descripcion: String;
}
