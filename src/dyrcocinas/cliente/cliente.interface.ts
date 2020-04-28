import { Document } from 'mongoose';

export interface Cliente extends Document {
  readonly estado: String;
  readonly nombre_proyecto: String;
  readonly cedula: String;
  readonly nombres_apellidos: String;
  readonly telefono: number;
  readonly celular: number;
  readonly correo: String;
  readonly ciudad: String;
  readonly sector: String;
  readonly direccion: String;
  readonly medidas: String;
  readonly color_madekor_REL: String;
  readonly color_combinado_REL: String;
  readonly precio: number;
  readonly fecha_inicio_proyecto: String;
  readonly fecha_entrega_proyecto: String;
  readonly fecha_garantia_proyecto: String;
  readonly desc_garantia: String;
  readonly coti_ferreteria: [];
  readonly coti_madecor: [];
}
