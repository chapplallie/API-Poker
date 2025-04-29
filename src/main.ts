import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerInterceptorInterceptor } from './logger-interceptor/logger-interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('poker API')
    .setDescription('poker API ')
    .setVersion('1.0')
    .addTag('poker')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  app.useGlobalInterceptors(new LoggerInterceptorInterceptor())
  await app.listen(process.env.PORT ?? 3000);
  console.log('API is running on http://localhost:' + (process.env.PORT ?? 3000));
  
}
bootstrap();
