import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';


@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') readonly productModel: Model<Product>){}

    async getProducts():Promise<Product[]>{
        const products = await this.productModel.find()
        return products;

    }

    async getProduct(productID: string): Promise<Product>{
        const product = await this.productModel.findById(productID);
        return product;
    }

    async createProduct(CreateProductDTO: CreateProductDTO): Promise<Product>{
       const product = new this.productModel(CreateProductDTO); //crear un nuevo objeto basado en la definicion
       await product.save()
        return product;
    }

    async updateProduct(productID: string, createProductDTO:CreateProductDTO):Promise<Product>{
       const updateProduct = await this.productModel.findByIdAndUpdate(productID,createProductDTO,{new:true}); //{new:true} devuelve el nuevo objeto creado
       return updateProduct;
    }

    async deleteProduct(productID:string):Promise<Product>{ //<any>
     const deletedProduct = await this.productModel.findByIdAndDelete(productID);
     return deletedProduct;
    }

}
