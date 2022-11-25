import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runDb } from './db';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await runDb();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
  console.log(`Started at port: ${PORT}`);
}
bootstrap();
