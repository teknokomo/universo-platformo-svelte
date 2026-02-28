import { b as private_env } from "./shared-server.js";
import { c as createClient } from "./index2.js";
function createSupabaseAdminClient(supabaseUrl, serviceRoleKey) {
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
function createSupabaseAnonClient(supabaseUrl, anonKey) {
  return createClient(supabaseUrl, anonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
class AuthService {
  supabaseUrl;
  supabaseAnonKey;
  supabaseServiceRoleKey;
  constructor(config) {
    this.supabaseUrl = config.supabaseUrl;
    this.supabaseAnonKey = config.supabaseAnonKey;
    this.supabaseServiceRoleKey = config.supabaseServiceRoleKey;
  }
  /**
   * Login with email and password via Supabase
   */
  async login(credentials) {
    const client = createSupabaseAnonClient(this.supabaseUrl, this.supabaseAnonKey);
    const { data, error } = await client.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });
    if (error) {
      throw new Error(error.message);
    }
    if (!data.user || !data.session) {
      throw new Error("Login failed: no user data returned");
    }
    const user = {
      id: data.user.id,
      email: data.user.email ?? credentials.email
    };
    const session = {
      userId: data.user.id,
      email: user.email,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresAt: data.session.expires_at
    };
    return { user, session };
  }
  /**
   * Register a new user via Supabase
   */
  async register(credentials) {
    const client = createSupabaseAnonClient(this.supabaseUrl, this.supabaseAnonKey);
    const { data, error } = await client.auth.signUp({
      email: credentials.email,
      password: credentials.password
    });
    if (error) {
      throw new Error(error.message);
    }
    if (!data.user) {
      throw new Error("Registration failed: no user data returned");
    }
    const user = {
      id: data.user.id,
      email: data.user.email ?? credentials.email
    };
    const session = {
      userId: data.user.id,
      email: user.email,
      accessToken: data.session?.access_token ?? "",
      refreshToken: data.session?.refresh_token,
      expiresAt: data.session?.expires_at
    };
    return { user, session };
  }
  /**
   * Verify an access token and return the user
   */
  async verifyToken(accessToken) {
    try {
      const adminClient = createSupabaseAdminClient(this.supabaseUrl, this.supabaseServiceRoleKey);
      const { data, error } = await adminClient.auth.getUser(accessToken);
      if (error || !data.user) {
        return null;
      }
      return {
        id: data.user.id,
        email: data.user.email ?? ""
      };
    } catch {
      return null;
    }
  }
  /**
   * Refresh a session using the refresh token
   */
  async refreshSession(refreshToken) {
    try {
      const client = createSupabaseAnonClient(this.supabaseUrl, this.supabaseAnonKey);
      const { data, error } = await client.auth.refreshSession({ refresh_token: refreshToken });
      if (error || !data.user || !data.session) {
        return null;
      }
      const user = {
        id: data.user.id,
        email: data.user.email ?? ""
      };
      const session = {
        userId: data.user.id,
        email: user.email,
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: data.session.expires_at
      };
      return { user, session };
    } catch {
      return null;
    }
  }
}
function createAuthService(config) {
  return new AuthService(config);
}
let _authService = null;
function getAuthService() {
  if (!_authService) {
    const supabaseUrl = private_env.SUPABASE_URL;
    const supabaseAnonKey = private_env.SUPABASE_ANON_KEY;
    const supabaseServiceRoleKey = private_env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
      throw new Error(
        "Missing Supabase environment variables. Ensure SUPABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY are set."
      );
    }
    _authService = createAuthService({
      supabaseUrl,
      supabaseAnonKey,
      supabaseServiceRoleKey
    });
  }
  return _authService;
}
export {
  getAuthService as g
};
