module.exports = [
	{
		name: 'file_storage_backend_1',
		script: './apps/storage/dist/apps/storage/src/main.js',
		wait_ready: true,
		listen_timeout: 10000,
		env_production: {
			NODE_ENV: 'production',
			PORT: '3032',
		},
		env_development: {
			NODE_ENV: 'development',
			PORT: '3032',
		},
	},
];
