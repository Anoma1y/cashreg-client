export const url = {
	index: '/',
	auth: {
		index: '/auth',
		signin: {
			index: '/auth/signin',
		},
		signup: {
			index: '/auth/signup',
			confirm: '/auth/signup/confirm',
			create: '/auth/signup/create',
			send: '/auth/signup/send',
			success: '/auth/signup/success',
		},
		restore: {
			index: '/auth/restore',
			email: '/auth/restore/email',
			send: '/auth/restore/send',
			password: '/auth/restore/password',
			success: '/auth/restore/success',
		},
	},
	home: {
		workspace: {
			index: '/workspace',
		},
		project: {
			index: '/project',
			single: '/project',
			singleRoute: '/project/:project_id',
		},
		transaction: {
			index: '/transaction',
		},
		category: {
			index: '/category',
		},
		contragent: {
			index: '/contragent',
		},
	},
};

export const tokenInfo = {
	auth_store: 'cookie',
	access_token_key: 'access_token',
	refresh_token_key: 'refresh_token',
	expires_token_key: 'expires_at',
	auth_store_local: 'local',
	auth_store_cookie: 'cookie',
	token_type: 'Bearer ',
};

export const endpoint = {

};
