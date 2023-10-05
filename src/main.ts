import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { TypeORMExceptionFilter } from './filters/typeorm-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )
  app.useGlobalFilters(new TypeORMExceptionFilter());

  app.enableCors()
  await app.listen(process.env.PORT);
}
bootstrap();
