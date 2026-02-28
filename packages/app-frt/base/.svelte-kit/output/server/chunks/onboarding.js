import { b as private_env } from "./shared-server.js";
import { c as createClient } from "./index2.js";
class OnboardingService {
  supabaseUrl;
  supabaseServiceRoleKey;
  constructor(config) {
    this.supabaseUrl = config.supabaseUrl;
    this.supabaseServiceRoleKey = config.supabaseServiceRoleKey;
  }
  get client() {
    return createClient(this.supabaseUrl, this.supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  /**
   * Get all available onboarding items for a user.
   * Returns Projects (Global Goals), Campaigns (Personal Interests), Clusters (Platform Features).
   *
   * For the initial implementation, checks if the user has completed onboarding
   * via a user_metadata field in Supabase.
   */
  async getOnboardingItems(userId) {
    try {
      const { data: userData } = await this.client.auth.admin.getUserById(userId);
      const onboardingCompleted = userData?.user?.user_metadata?.onboarding_completed === true;
      return {
        projects: [],
        campaigns: [],
        clusters: [],
        onboardingCompleted
      };
    } catch (error) {
      console.error("[OnboardingService] Failed to get onboarding items:", error);
      return {
        projects: [],
        campaigns: [],
        clusters: [],
        onboardingCompleted: false
      };
    }
  }
  /**
   * Join selected onboarding items and mark onboarding as completed.
   */
  async joinItems(userId, data) {
    try {
      await this.client.auth.admin.updateUserById(userId, {
        user_metadata: {
          onboarding_completed: true
        }
      });
      return {
        success: true,
        added: {
          projects: data.projectIds.length,
          campaigns: data.campaignIds.length,
          clusters: data.clusterIds.length
        },
        removed: {
          projects: 0,
          campaigns: 0,
          clusters: 0
        },
        onboardingCompleted: true
      };
    } catch (error) {
      console.error("[OnboardingService] Failed to join items:", error);
      throw new Error("Failed to save onboarding selections");
    }
  }
}
function createOnboardingService(config) {
  return new OnboardingService(config);
}
let _onboardingService = null;
function getOnboardingService() {
  if (!_onboardingService) {
    const supabaseUrl = private_env.SUPABASE_URL;
    const supabaseServiceRoleKey = private_env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error(
        "Missing Supabase environment variables. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set."
      );
    }
    _onboardingService = createOnboardingService({
      supabaseUrl,
      supabaseServiceRoleKey
    });
  }
  return _onboardingService;
}
export {
  getOnboardingService as g
};
