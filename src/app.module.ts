import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot
      ('mongodb+srv://dbSantiago:santti9312@santiagocluster-vrusr.mongodb.net/portafolio?retryWrites=true&w=majority',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        }),
        UsersModule,
  AuthModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService],
})
export class AppModule { }
