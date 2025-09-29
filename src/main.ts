import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const PORT = Number(process.env.PORT ?? 3000)

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('Donat Project')
    .setDescription('The Donat API description')
    .setVersion('1.0')
    .addTag('Nest, bacrypt, jwt, guard, swagger, validation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(PORT, () => {
    console.log('Server running', 3000),
    console.log(`Swagger document: http://localhost:${PORT}/api/docs`);
  });
}
bootstrap();
