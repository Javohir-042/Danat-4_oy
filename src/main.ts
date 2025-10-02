import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from './common/guards/auth.guard';
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

  const reflector = app.get(Reflector); 
  
  app.useGlobalGuards(new AuthGuard(reflector));   

  const config = new DocumentBuilder()
    .setTitle('Donat Project')
    .setDescription('The Donat API description')
    .setVersion('1.0')
    .addTag('Nest, bacrypt, jwt, guard, swagger, validation')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      in: 'Header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  await app.listen(PORT, () => {
    console.log('Server running', 3000),
    console.log(`Swagger document: http://localhost:${PORT}/api/docs`);
  });
}
bootstrap();
