import { NestFactory } from '@nestjs/core';
// Triggering dev restart
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();

  // Servir archivos estáticos
  app.useStaticAssets(join(process.cwd(), 'public'));

  // Configuración de Swagger para pruebas de API
  const config = new DocumentBuilder()
    .setTitle('LMS Enervida API')
    .setDescription('Documentación y pruebas de los endpoints del backend')
    .setVersion('1.0')
    .addBearerAuth() // Para futuras pruebas con JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
