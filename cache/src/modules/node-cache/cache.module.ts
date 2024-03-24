import { DynamicModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({})
export class CacheModule {
	static register(ttl: number): DynamicModule {
		return {
			module: CacheModule,
			providers: [
				{
					provide: 'CACHE_TTL',
					useValue: ttl,
				},
				CacheService,
			],
			exports: [CacheService],
		};
	}
}
