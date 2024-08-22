import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './apps/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './framework/utils/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.PORT || 5000;
  const apiPrefix = 'api/v1';

  app.setGlobalPrefix(apiPrefix);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port);
}
bootstrap();
