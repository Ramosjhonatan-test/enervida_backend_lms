import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import dns from 'dns';

// 👇 fuerza IPv4 en la resolución DNS
dns.setDefaultResultOrder('ipv4first');

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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  // 👉 Render sigue usando listen
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// 👉 Bloque extra para Vercel serverless
let cachedHandler: any;

export default async function handler(req, res) {
  if (!cachedHandler) {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    app.useStaticAssets(join(process.cwd(), 'public'));

    const config = new DocumentBuilder()
      .setTitle('LMS Enervida API')
      .setDescription('Documentación y pruebas de los endpoints del backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
      ],
    });

    await app.init();
    cachedHandler = app.getHttpAdapter().getInstance();
  }

  return cachedHandler(req, res);
}
