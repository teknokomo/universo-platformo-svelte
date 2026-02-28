
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/auth" | "/api/auth/csrf" | "/api/auth/login" | "/api/auth/logout" | "/api/auth/me" | "/api/auth/register" | "/api/v1" | "/api/v1/onboarding" | "/api/v1/onboarding/items" | "/api/v1/onboarding/join" | "/auth";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/auth": Record<string, never>;
			"/api/auth/csrf": Record<string, never>;
			"/api/auth/login": Record<string, never>;
			"/api/auth/logout": Record<string, never>;
			"/api/auth/me": Record<string, never>;
			"/api/auth/register": Record<string, never>;
			"/api/v1": Record<string, never>;
			"/api/v1/onboarding": Record<string, never>;
			"/api/v1/onboarding/items": Record<string, never>;
			"/api/v1/onboarding/join": Record<string, never>;
			"/auth": Record<string, never>
		};
		Pathname(): "/" | "/api/auth/csrf" | "/api/auth/login" | "/api/auth/logout" | "/api/auth/me" | "/api/auth/register" | "/api/v1/onboarding/items" | "/api/v1/onboarding/join" | "/auth";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}