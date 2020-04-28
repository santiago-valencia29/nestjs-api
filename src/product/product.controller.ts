import { Controller,Get,Post,Put,Delete, Res, HttpStatus, Body, Param,NotFoundException, Query, UseGuards } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){

    }

    @Post('/create')
    async createPost(@Res() res,@Body() createProductDTO:CreateProductDTO){  //enviar respuesta a clientes    createProductDTO que es lo que necesariamente vamos a recibir
    //    console.log(createProductDTO);
       const product = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    }


    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
         return res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:productID') // utilizando un parametro
    async getProduct(@Res() res ,@Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('Product Not Found')
        return res.status(HttpStatus.OK).json(product);

    }

    @Delete('/delete')  //utilizando una consulta
    async deleteProduct(@Res() res,@Query('productID') productID){
     const productDeleted = await   this.productService.deleteProduct(productID);
     if(!productDeleted) throw new NotFoundException('Product Not Found')
        return res.status(HttpStatus.OK).json({
            message:'Product Deleted Succesfully',
            productDeleted});
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body()createProductDTO:CreateProductDTO, @Query('productID')productID){
        const updatedProduct = await this.productService.updateProduct(productID,createProductDTO);
        if(!updatedProduct) throw new NotFoundException('Product Not Found');
        return res.status(HttpStatus.OK).json({
            message:'Product Updated Succesfully',
            updatedProduct});
    }


}
