import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as csurf from 'csurf'
import * as cookieParser from 'cookie-parser'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: [
      'http://localhost:4200',
      'https://angular9.herokuapp.com/',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(helmet());
  app.enableCors();
  
  // app.use(csurf());
  // app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
