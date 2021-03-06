import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV == 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Hexa API')
      .setDescription('API utilizada na versão web e mobile.')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, swaggerDocument);
  }

  app.enableCors({ origin: process.env.CORS_ORIGIN });

  await app.listen(8080);
}
bootstrap();
