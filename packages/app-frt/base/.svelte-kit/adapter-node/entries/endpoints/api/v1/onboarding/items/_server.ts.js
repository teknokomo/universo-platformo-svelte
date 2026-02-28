import { json } from "@sveltejs/kit";
import { g as getOnboardingService } from "../../../../../../chunks/onboarding.js";
const GET = async ({ locals }) => {
  if (!locals.user) {
    return json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    const onboardingService = getOnboardingService();
    const items = await onboardingService.getOnboardingItems(locals.user.id);
    return json(items);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to load onboarding items";
    return json({ message }, { status: 500 });
  }
};
export {
  GET
};
