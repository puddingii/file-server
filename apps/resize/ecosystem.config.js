module.exports = [
	{
		name: 'file_resize_backend_1',
		script: './apps/resize/dist/apps/resize/src/main.js',
		wait_ready: true,
		listen_timeout: 10000,
		env_production: {
			NODE_ENV: 'production',
			PORT: '3031',
		},
		env_development: {
			NODE_ENV: 'development',
			PORT: '3031',
		},
	},
];
