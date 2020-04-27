import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { ColorMadecor } from './color-madecor.interface';
import { CreateColorMadecorDTO } from './color-madecor.dto';


@Injectable()
export class ColorMadecorService {

    constructor(@InjectModel('ColorMadecor') readonly colorMadecorModel: Model<ColorMadecor>){}

    async getColorMadecors():Promise<ColorMadecor[]>{
        const colorMadecors = await this.colorMadecorModel.find()
        return colorMadecors;
    }

    async getColorMadecor(colorMadecorID: string): Promise<ColorMadecor>{
        const colorMadecor = await this.colorMadecorModel.findById(colorMadecorID);
        return colorMadecor;
    }

    async createColorMadecor(CreateColorMadecorDTO: CreateColorMadecorDTO): Promise<ColorMadecor>{
       const colorMadecor = new this.colorMadecorModel(CreateColorMadecorDTO); //crear un nuevo objeto basado en la definicion
       await colorMadecor.save()
        return colorMadecor;
    }

    async updateColorMadecor(colorMadecorID: string, createColorMadecorDTO:CreateColorMadecorDTO):Promise<ColorMadecor>{
       const updateColorMadecor = await this.colorMadecorModel.findByIdAndUpdate(colorMadecorID,createColorMadecorDTO,{new:true}); //{new:true} devuelve el nuevo objeto creado
       return updateColorMadecor;
    }

    async deleteColorMadecor(colorMadecorID:string):Promise<ColorMadecor>{ //<any>
     const deletedColorMadecor = await this.colorMadecorModel.findByIdAndDelete(colorMadecorID);
     return deletedColorMadecor;
    }

}
