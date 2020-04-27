import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param,NotFoundException, Query, UseGuards, UseFilters } from '@nestjs/common';
import { CreateFerreteriaDTO } from './ferreteria.dto';
import { FerreteriaService } from './ferreteria.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/exception-filters/mongo-exception.filter';

@Controller('ferreteria')
export class FerreteriaController {

    constructor(private ferreteriaService: FerreteriaService){

    }

    // @UseGuards(AuthGuard('jwt'))
    @UseFilters(MongoExceptionFilter)
    @Post('/save-ferreteria')
    async createPost(@Res() res,@Body() createFerreteriaDTO:CreateFerreteriaDTO){  //enviar respuesta a ferreterias    createFerreteriaDTO que es lo que necesariamente vamos a recibir
    //    console.log(createFerreteriaDTO);
       const ferreteria = await this.ferreteriaService.createFerreteria(createFerreteriaDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Ferreteria Successfully Created',
            ferreteria
        });
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getFerreterias(@Res() res){
        const ferreterias = await this.ferreteriaService.getFerreterias();
         return res.status(HttpStatus.OK).json({
            ferreterias
        })
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get('/:ferreteriaID') // utilizando un parametro
    async getFerreteria(@Res() res ,@Param('ferreteriaID') ferreteriaID){
        const ferreteria = await this.ferreteriaService.getFerreteria(ferreteriaID);
        if(!ferreteria) throw new NotFoundException('Ferreteria Not Found')
        return res.status(HttpStatus.OK).json(ferreteria);

    }

    @Delete('/delete')  //utilizando una consulta
    async deleteFerreteria(@Res() res,@Query('ferreteriaID') ferreteriaID){
     const ferreteriaDeleted = await   this.ferreteriaService.deleteFerreteria(ferreteriaID);
     if(!ferreteriaDeleted) throw new NotFoundException('Ferreteria Not Found')
        return res.status(HttpStatus.OK).json({
            message:'Ferreteria Deleted Succesfully',
            ferreteriaDeleted});
    }

    @Put('/update')
    async updateFerreteria(@Res() res, @Body()createFerreteriaDTO:CreateFerreteriaDTO, @Query('ferreteriaID')ferreteriaID){
        const updatedFerreteria = await this.ferreteriaService.updateFerreteria(ferreteriaID,createFerreteriaDTO);
        if(!updatedFerreteria) throw new NotFoundException('Ferreteria Not Found');
        return res.status(HttpStatus.OK).json({
            message:'Ferreteria Updated Succesfully',
            updatedFerreteria});
    }


}
