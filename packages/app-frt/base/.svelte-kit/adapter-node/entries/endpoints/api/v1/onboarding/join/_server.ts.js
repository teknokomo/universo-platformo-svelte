import { json } from "@sveltejs/kit";
import { g as getOnboardingService } from "../../../../../../chunks/onboarding.js";
const POST = async ({ request, locals }) => {
  if (!locals.user) {
    return json({ message: "Not authenticated" }, { status: 401 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Invalid request body" }, { status: 400 });
  }
  const { projectIds = [], campaignIds = [], clusterIds = [] } = body;
  try {
    const onboardingService = getOnboardingService();
    const result = await onboardingService.joinItems(locals.user.id, {
      projectIds,
      campaignIds,
      clusterIds
    });
    return json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save onboarding selections";
    return json({ message }, { status: 500 });
  }
};
export {
  POST
};
