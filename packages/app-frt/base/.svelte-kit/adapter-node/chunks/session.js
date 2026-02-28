const SESSION_COOKIE_NAME = "up_session";
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
function serializeSession(data) {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}
function deserializeSession(cookieValue) {
  try {
    const json = Buffer.from(cookieValue, "base64").toString("utf-8");
    const data = JSON.parse(json);
    if (!data.userId || !data.email || !data.accessToken) {
      return null;
    }
    if (data.expiresAt && data.expiresAt * 1e3 < Date.now()) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
function getSessionCookieOptions(secure = true) {
  return {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: "/"
  };
}
export {
  SESSION_COOKIE_NAME as S,
  deserializeSession as d,
  getSessionCookieOptions as g,
  serializeSession as s
};
