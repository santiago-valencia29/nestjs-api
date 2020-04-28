import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse();

    const status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status==401){
       response.status(status).json({message:"Unauthorized", status:status});
    }else{
      response.status(status).json(error);
    }
    
  }
}