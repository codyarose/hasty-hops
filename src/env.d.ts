declare global {
	namespace NodeJS {
		interface ProcessEnv {
			REACT_APP_UNTAPPD_CLIENT_SECRET: string
			REACT_APP_UNTAPPD_CLIENT_ID: string
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			PWD: string;
		}
	}
}

export {}
