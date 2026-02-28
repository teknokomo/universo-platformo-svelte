import * as server from '../entries/pages/auth/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BFO5chMR.js","_app/immutable/chunks/p6HUggiK.js","_app/immutable/chunks/CEchjp2R.js","_app/immutable/chunks/CWSYcIcl.js","_app/immutable/chunks/CWv1L7UP.js","_app/immutable/chunks/Cv7qX89F.js"];
export const stylesheets = ["_app/immutable/assets/3.DcmWmNZH.css"];
export const fonts = [];
