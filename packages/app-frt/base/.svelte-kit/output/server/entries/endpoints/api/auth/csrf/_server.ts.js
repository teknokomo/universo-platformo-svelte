import { json } from "@sveltejs/kit";
import crypto from "node:crypto";
const GET = async () => {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  return json({ csrfToken });
};
export {
  GET
};
