import { json } from "@sveltejs/kit";
import { g as getAuthService } from "../../../../../chunks/supabase.js";
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid request body" }, { status: 400 });
  }
  const { email, password, termsAccepted, privacyAccepted } = body;
  if (!email || !password) {
    return json({ message: "Email and password are required" }, { status: 400 });
  }
  try {
    const authService = getAuthService();
    const result = await authService.register({ email, password, termsAccepted, privacyAccepted });
    return json({ user: result.user, message: "Registration successful. Check your email to confirm." }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    return json({ message }, { status: 400 });
  }
};
export {
  POST
};
