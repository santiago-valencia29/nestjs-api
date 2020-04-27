import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import { Cliente } from './cliente.interface';
import { CreateClienteDTO } from './cliente.dto';


@Injectable()
export class ClienteService {

    constructor(@InjectModel('Cliente') readonly clienteModel: Model<Cliente>){}

    async getClientes():Promise<Cliente[]>{
        const clientes = await this.clienteModel.find()
        return clientes;
    }

    async getCliente(clienteID: string): Promise<Cliente>{
        const cliente = await this.clienteModel.findById(clienteID);
        return cliente;
    }

    async createCliente(CreateClienteDTO: CreateClienteDTO): Promise<Cliente>{
       const cliente = new this.clienteModel(CreateClienteDTO); //crear un nuevo objeto basado en la definicion
       await cliente.save()
        return cliente;
    }

    async updateCliente(clienteID: string, createClienteDTO:CreateClienteDTO):Promise<Cliente>{
       const updateCliente = await this.clienteModel.findByIdAndUpdate(clienteID,createClienteDTO,{new:true}); //{new:true} devuelve el nuevo objeto creado
       return updateCliente;
    }

    async deleteCliente(clienteID:string):Promise<Cliente>{ //<any>
     const deletedCliente = await this.clienteModel.findByIdAndDelete(clienteID);
     return deletedCliente;
    }

}
