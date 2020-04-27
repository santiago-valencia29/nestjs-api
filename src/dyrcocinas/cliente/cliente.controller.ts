import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param,NotFoundException, Query, UseGuards, UseFilters } from '@nestjs/common';
import { CreateClienteDTO } from './cliente.dto';
import { ClienteService } from './cliente.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/exception-filters/mongo-exception.filter';

@Controller('cliente')
export class ClienteController {

    constructor(private clienteService: ClienteService){

    }

    // @UseGuards(AuthGuard('jwt'))
    @UseFilters(MongoExceptionFilter)
    @Post('/save-cliente')
    async createPost(@Res() res,@Body() createClienteDTO:CreateClienteDTO){  //enviar respuesta a clientes    createClienteDTO que es lo que necesariamente vamos a recibir
    //    console.log(createClienteDTO);
       const cliente = await this.clienteService.createCliente(createClienteDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Cliente Successfully Created',
            cliente
        });
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getClientes(@Res() res){
        const clientes = await this.clienteService.getClientes();
         return res.status(HttpStatus.OK).json({
            clientes
        })
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/:clienteID') // utilizando un parametro
    async getCliente(@Res() res ,@Param('clienteID') clienteID){
        const cliente = await this.clienteService.getCliente(clienteID);
        if(!cliente) throw new NotFoundException('Cliente Not Found')
        return res.status(HttpStatus.OK).json(cliente);

    }

    @Delete('/delete')  //utilizando una consulta
    async deleteCliente(@Res() res,@Query('clienteID') clienteID){
     const clienteDeleted = await   this.clienteService.deleteCliente(clienteID);
     if(!clienteDeleted) throw new NotFoundException('Cliente Not Found')
        return res.status(HttpStatus.OK).json({
            message:'Cliente Deleted Succesfully',
            clienteDeleted});
    }

    @Put('/update')
    async updateCliente(@Res() res, @Body()createClienteDTO:CreateClienteDTO, @Query('clienteID')clienteID){
        const updatedCliente = await this.clienteService.updateCliente(clienteID,createClienteDTO);
        if(!updatedCliente) throw new NotFoundException('Cliente Not Found');
        return res.status(HttpStatus.OK).json({
            message:'Cliente Updated Succesfully',
            updatedCliente});
    }


}
