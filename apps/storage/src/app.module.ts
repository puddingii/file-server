import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from './config';
import { ImageModule } from './modules/image/image.module';

@Module({
	imports: [ConfigModule, ImageModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
