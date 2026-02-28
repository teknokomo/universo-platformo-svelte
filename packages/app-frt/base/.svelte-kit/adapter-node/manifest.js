export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Dbyo0uqd.js",app:"_app/immutable/entry/app.CBvBA6SW.js",imports:["_app/immutable/entry/start.Dbyo0uqd.js","_app/immutable/chunks/CWSYcIcl.js","_app/immutable/chunks/p6HUggiK.js","_app/immutable/chunks/CWv1L7UP.js","_app/immutable/entry/app.CBvBA6SW.js","_app/immutable/chunks/p6HUggiK.js","_app/immutable/chunks/CEchjp2R.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/auth/csrf",
				pattern: /^\/api\/auth\/csrf\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/csrf/_server.ts.js'))
			},
			{
				id: "/api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/login/_server.ts.js'))
			},
			{
				id: "/api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/logout/_server.ts.js'))
			},
			{
				id: "/api/auth/me",
				pattern: /^\/api\/auth\/me\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/me/_server.ts.js'))
			},
			{
				id: "/api/auth/register",
				pattern: /^\/api\/auth\/register\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/auth/register/_server.ts.js'))
			},
			{
				id: "/api/v1/onboarding/items",
				pattern: /^\/api\/v1\/onboarding\/items\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/onboarding/items/_server.ts.js'))
			},
			{
				id: "/api/v1/onboarding/join",
				pattern: /^\/api\/v1\/onboarding\/join\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/v1/onboarding/join/_server.ts.js'))
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);
