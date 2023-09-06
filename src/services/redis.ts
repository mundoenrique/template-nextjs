import Redis, { RedisOptions } from 'ioredis';
const Logger = require("@/utils/logger");

const attemp = parseInt(process.env.REDIS_ATTEMPT || '') || 3
const redis = {
  host: process.env.REDIS_HOST || '',
  password: process.env.REDIS_PASSWORD || '',
	port: parseInt(process.env.REDIS_PORT || '') || 0,
	db: parseInt(process.env.REDIS_DB || '') || 0,
	prefix: process.env.REDIX_PREFIX || ''
}

function getRedisConfiguration(): {
  port: number;
  host: string;
	password: string;
	db: number,
	prefix: string
} {
  return redis;
}

export function createRedisInstance(
  config = getRedisConfiguration()
) {
  try {
    const options: RedisOptions = {
			host: config.host,
			port: config.port,
			db: config.db,
			password: config.password,
			keyPrefix: config.prefix,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: () => {
				if (attemp > 3) {
					return undefined
        }
        return Math.min(attemp * 200, 1000);
      },
    };

    const redis = new Redis(options);

    redis.on('error', (error: unknown) => {
			Logger.warn('[Redis] Error connecting', error);
			return false
		});

		redis.on("ready", async (error: unknown) => {
			Logger.info("[Redis] Success connection");
			return true;
		});

		redis.on("end", (error: unknown) => {
			Logger.info("[Redis] Close connection");
			return true;
		});

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}
