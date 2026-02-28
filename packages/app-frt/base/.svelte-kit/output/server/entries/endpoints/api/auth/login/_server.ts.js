import { json } from "@sveltejs/kit";
import { g as getAuthService } from "../../../../../chunks/supabase.js";
import { S as SESSION_COOKIE_NAME, s as serializeSession, g as getSessionCookieOptions } from "../../../../../chunks/session.js";
const POST = async ({ request, cookies }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid request body" }, { status: 400 });
  }
  const { email, password } = body;
  if (!email || !password) {
    return json({ message: "Email and password are required" }, { status: 400 });
  }
  try {
    const authService = getAuthService();
    const result = await authService.login({ email, password });
    const sessionData = {
      userId: result.session.userId,
      email: result.session.email,
      accessToken: result.session.accessToken,
      refreshToken: result.session.refreshToken,
      expiresAt: result.session.expiresAt
    };
    const isProduction = process.env.NODE_ENV === "production";
    cookies.set(SESSION_COOKIE_NAME, serializeSession(sessionData), {
      ...getSessionCookieOptions(isProduction),
      path: "/"
    });
    return json({ user: result.user });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed";
    return json({ message }, { status: 401 });
  }
};
export {
  POST
};
