import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Ferreteria } from './ferreteria.interface';
import { CreateFerreteriaDTO } from './ferreteria.dto';


@Injectable()
export class FerreteriaService {

    constructor(@InjectModel('Ferreteria') readonly ferreteriaModel: Model<Ferreteria>){}

    async getFerreterias():Promise<Ferreteria[]>{
        const ferreterias = await this.ferreteriaModel.find()
        return ferreterias;
    }

    async getFerreteria(ferreteriaID: string): Promise<Ferreteria>{
        const ferreteria = await this.ferreteriaModel.findById(ferreteriaID);
        return ferreteria;
    }

    async createFerreteria(CreateFerreteriaDTO: CreateFerreteriaDTO): Promise<Ferreteria>{
       const ferreteria = new this.ferreteriaModel(CreateFerreteriaDTO); //crear un nuevo objeto basado en la definicion
       await ferreteria.save()
        return ferreteria;
    }

    async updateFerreteria(ferreteriaID: string, createFerreteriaDTO:CreateFerreteriaDTO):Promise<Ferreteria>{
       const updateFerreteria = await this.ferreteriaModel.findByIdAndUpdate(ferreteriaID,createFerreteriaDTO,{new:true}); //{new:true} devuelve el nuevo objeto creado
       return updateFerreteria;
    }

    async deleteFerreteria(ferreteriaID:string):Promise<Ferreteria>{ //<any>
     const deletedFerreteria = await this.ferreteriaModel.findByIdAndDelete(ferreteriaID);
     return deletedFerreteria;
    }

}
