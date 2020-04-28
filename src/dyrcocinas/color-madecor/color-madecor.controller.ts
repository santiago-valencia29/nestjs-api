import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param,NotFoundException, Query, UseGuards, UseFilters } from '@nestjs/common';
import { CreateColorMadecorDTO } from './color-madecor.dto';
import { ColorMadecorService } from './color-madecor.service';
import { AuthGuard } from '@nestjs/passport';
import { MongoExceptionFilter } from 'src/exception-filters/mongo-exception.filter';

@Controller('color-madecor')
export class ColorMadecorController {

    constructor(private colorMadecorService: ColorMadecorService){

    }

    @UseGuards(AuthGuard('jwt'))
    @UseFilters(MongoExceptionFilter)
    @Post('/save-colorMadecor')
    async createPost(@Res() res,@Body() createColorMadecorDTO:CreateColorMadecorDTO){  //enviar respuesta a colorMadecors    createColorMadecorDTO que es lo que necesariamente vamos a recibir
    //    console.log(createColorMadecorDTO);
       const colorMadecor = await this.colorMadecorService.createColorMadecor(createColorMadecorDTO);
        return res.status(HttpStatus.OK).json({
            message: 'ColorMadecor Successfully Created',
            colorMadecor
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getColorMadecors(@Res() res){
        const colorMadecors = await this.colorMadecorService.getColorMadecors();
         return res.status(HttpStatus.OK).json({
            colorMadecors
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:colorMadecorID') // utilizando un parametro
    async getColorMadecor(@Res() res ,@Param('colorMadecorID') colorMadecorID){
        const colorMadecor = await this.colorMadecorService.getColorMadecor(colorMadecorID);
        if(!colorMadecor) throw new NotFoundException('ColorMadecor Not Found')
        return res.status(HttpStatus.OK).json(colorMadecor);

    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')  //utilizando una consulta
    async deleteColorMadecor(@Res() res,@Query('colorMadecorID') colorMadecorID){
     const colorMadecorDeleted = await   this.colorMadecorService.deleteColorMadecor(colorMadecorID);
     if(!colorMadecorDeleted) throw new NotFoundException('ColorMadecor Not Found')
        return res.status(HttpStatus.OK).json({
            message:'ColorMadecor Deleted Succesfully',
            colorMadecorDeleted});
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updateColorMadecor(@Res() res, @Body()createColorMadecorDTO:CreateColorMadecorDTO, @Query('colorMadecorID')colorMadecorID){
        const updatedColorMadecor = await this.colorMadecorService.updateColorMadecor(colorMadecorID,createColorMadecorDTO);
        if(!updatedColorMadecor) throw new NotFoundException('ColorMadecor Not Found');
        return res.status(HttpStatus.OK).json({
            message:'ColorMadecor Updated Succesfully',
            updatedColorMadecor});
    }


}
