import { Controller, Get, Post, Put, Delete, Res,HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';

import {CreateProductDTO} from './dto/product.dto';

import{ProductService} from './product.service';

@Controller('product')
export class ProductController {
  constructor( private productService:ProductService){}
  @Post('/create')
  async createPost(@Res() res, @Body() createProductDto:CreateProductDTO){
     const product =await this.productService.createProduct(createProductDto)
     return res.status(HttpStatus.OK).json({
          message:'Producto creado',
          product: product
      });
}

@Get('/')
   async getProducts(@Res()res){
     const products =await this.productService.getProducts();
     return res.status(HttpStatus.OK).json({
         products
     }
       )
   }

 @Get('/:productID')
    async gatProduct(@Res() res, @Param('productID') productID ) {
      const product =await this.productService.getProduct(productID);
      if(!product) throw new NotFoundException('Producto no existe');
      return res.status(HttpStatus.OK).json(product);
       
    }

  @Delete('/delete')
  async deleteProduct(@Res()res, @Query('productID') productID){
    const productdelete =await this.productService.deleteProduct(productID);
    if(!productdelete) throw new NotFoundException('Producto no existe');
    return res.status(HttpStatus.OK).json({
      message:'Producto eliminado',
      productdelete
    })
  }
  @Put('/update')
  async updateProduct(@Res()res, @Body()createProductDTO:CreateProductDTO, @Query('productID')productID){
   const updateproduct= await this.productService.updateProduct(productID,createProductDTO);
   if(!updateproduct) throw new NotFoundException('Producto no existe');
   return res.status(HttpStatus.OK).json({
    message:'Producto actualizado',
    updateproduct
  })
  }
  
} 
