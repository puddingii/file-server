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
	// {
	// 	name: 'file_storage_backend_2',
	// 	script: './apps/storage/dist/apps/storage/src/main.js',
	// 	wait_ready: true,
	// 	listen_timeout: 10000,
	// 	env_production: {
	// 		NODE_ENV: 'production',
	// 		PORT: '3132',
	// 		// PORT: '7612',
	// 	},
	// 	env_development: {
	// 		NODE_ENV: 'development',
	// 		PORT: '3132',
	// 		ORIGIN_LIST_STR: 'http://localhost:3044'
	// 	},
	// },
];
