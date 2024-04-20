import { DynamicModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({})
export class CacheModule {
	static register(ttl: number): DynamicModule {
		return {
			module: CacheModule,
			/** Caching options는 각 서비스에서 동적으로 세팅 */
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
