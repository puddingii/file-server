import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImageModule } from './modules/image/image.module';
import { ConfigModule } from './config';

@Module({
	imports: [ConfigModule, ImageModule],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
