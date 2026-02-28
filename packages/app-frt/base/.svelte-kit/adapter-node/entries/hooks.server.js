import "@sveltejs/kit";
import { S as SESSION_COOKIE_NAME, d as deserializeSession } from "../chunks/session.js";
import { g as getAuthService } from "../chunks/supabase.js";
const handle = async ({ event, resolve }) => {
  const cookieValue = event.cookies.get(SESSION_COOKIE_NAME);
  if (cookieValue) {
    const sessionData = deserializeSession(cookieValue);
    if (sessionData) {
      try {
        const authService = getAuthService();
        const user = await authService.verifyToken(sessionData.accessToken);
        if (user) {
          event.locals.user = user;
        } else {
          event.cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
          event.locals.user = null;
        }
      } catch (err) {
        console.error("[hooks.server] Failed to verify token:", err);
        event.locals.user = null;
      }
    } else {
      event.cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }
  return resolve(event);
};
export {
  handle
};
