import { c as create_ssr_component } from "../../chunks/ssr.js";
import { a as auth } from "../../chunks/auth.js";
const css = {
  code: "*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,\n            'Helvetica Neue', sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { auth } from \\"$lib/stores/auth\\";\\nexport let data;\\n$: auth.setUser(data.user ?? null);\\n<\/script>\\n\\n<slot />\\n\\n<style>\\n    :global(*) {\\n        box-sizing: border-box;\\n        margin: 0;\\n        padding: 0;\\n    }\\n\\n    :global(body) {\\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,\\n            'Helvetica Neue', sans-serif;\\n        -webkit-font-smoothing: antialiased;\\n        -moz-osx-font-smoothing: grayscale;\\n    }\\n</style>\\n"],"names":[],"mappings":"AASY,CAAG,CACP,UAAU,CAAE,UAAU,CACtB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACb,CAEQ,IAAM,CACV,WAAW,CAAE,aAAa,CAAC,CAAC,kBAAkB,CAAC,CAAC,UAAU,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,CAAC,SAAS;AACrG,YAAY,gBAAgB,CAAC,CAAC,UAAU,CAChC,sBAAsB,CAAE,WAAW,CACnC,uBAAuB,CAAE,SAC7B"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  {
    auth.setUser(data.user ?? null);
  }
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
