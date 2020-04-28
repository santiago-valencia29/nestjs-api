import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteSchema } from './cliente.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: 'Cliente', schema: ClienteSchema }
      ]
    )

  ],
  providers: [ClienteService],
  controllers: [ClienteController]
})
export class ClienteModule {}
