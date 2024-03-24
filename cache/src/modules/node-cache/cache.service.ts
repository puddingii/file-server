import { Inject, Injectable } from '@nestjs/common';
import * as NodeCache from 'node-cache';

@Injectable()
export class CacheService {
	private imageCache: NodeCache;

	constructor(@Inject('CACHE_TTL') private readonly ttl: number) {
		this.imageCache = new NodeCache({ stdTTL: this.ttl }); // 10분 TTL 설정
	}

	cacheImage(key: string, data: Buffer): void {
		this.imageCache.set(key, data);
	}

	getCachedImage(key: string): Buffer {
		return this.imageCache.get(key);
	}
}
