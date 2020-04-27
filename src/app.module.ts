import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { ClienteModule } from './dyrcocinas/cliente/cliente.module';
import { ColorMadecorModule } from './dyrcocinas/color-madecor/color-madecor.module';
import { FerreteriaModule } from './dyrcocinas/ferreteria/ferreteria.module';

@Module({
  imports: [
    MongooseModule.forRoot
      ('mongodb+srv://dbSantiago:santti9312@santiagocluster-vrusr.mongodb.net/portafolio?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        }),
        UserModule,
  AuthModule,
  ProductModule,
  ProjectModule,
  ClienteModule,
  ColorMadecorModule,
  FerreteriaModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService],
})
export class AppModule { }
