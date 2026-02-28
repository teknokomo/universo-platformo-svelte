import * as universal from '../entries/pages/_layout.ts.js';
import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BH7gftoi.js","_app/immutable/chunks/p6HUggiK.js","_app/immutable/chunks/CEchjp2R.js","_app/immutable/chunks/Cv7qX89F.js","_app/immutable/chunks/CWv1L7UP.js"];
export const stylesheets = ["_app/immutable/assets/0.K32rjajV.css"];
export const fonts = [];
