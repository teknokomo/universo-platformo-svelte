import { json } from "@sveltejs/kit";
const GET = async ({ locals }) => {
  if (!locals.user) {
    return json({ message: "Not authenticated" }, { status: 401 });
  }
  return json({
    id: locals.user.id,
    email: locals.user.email
  });
};
export {
  GET
};
