import { json } from "@sveltejs/kit";
import { S as SESSION_COOKIE_NAME } from "../../../../../chunks/session.js";
const POST = async ({ cookies }) => {
  cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
  return json({ success: true });
};
export {
  POST
};
