import { Module } from '@nestjs/common';
import { FerreteriaService } from './ferreteria.service';
import { FerreteriaController } from './ferreteria.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FerreteriaSchema } from './ferreteria.schema';

@Module({
    imports: [
        MongooseModule.forFeature(
          [
            { name: 'Ferreteria', schema: FerreteriaSchema }
          ]
        )
    
      ],
  providers: [FerreteriaService],
  controllers: [FerreteriaController]
})
export class FerreteriaModule {}
