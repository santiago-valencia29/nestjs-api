import { Module } from '@nestjs/common';
import { ColorMadecorService } from './color-madecor.service';
import { ColorMadecorController } from './color-madecor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColorMadecorSchema } from 'src/dyrcocinas/color-madecor/color-madecor.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'ColorMadecor', schema: ColorMadecorSchema }
      ]
    )

  ],
  providers: [ColorMadecorService],
  controllers: [ColorMadecorController]
})
export class ColorMadecorModule {}
