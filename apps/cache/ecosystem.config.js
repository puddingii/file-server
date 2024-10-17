module.exports = [
	{
		name: 'file_cache_backend_1',
		script: './apps/cache/dist/apps/cache/src/main.js',
		wait_ready: true,
		listen_timeout: 10000,
		env_production: {
			NODE_ENV: 'production',
			PORT: '3030',
		},
		env_development: {
			NODE_ENV: 'development',
			PORT: '3030',
		},
	},
];
