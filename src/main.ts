import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(parseInt(process.env.PORT), () => {
    console.log('Server running at PORT ->', process.env.PORT);
  });
}
bootstrap();
