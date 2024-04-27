import { User } from "./user.interface";

export interface EnvironmentConfig {
  authIdName: string,
  tokenStoreId: string;
  loginUrl: string;
  logoutUrl: string;
  pinLoginUrl?: string;
  tryPINLogin?: boolean; // Would try PIN login if JWT token exists
  interceptorSkipUrls?: string[];
  superAdminPages: string[];
  forgotPasswordUrl: string;
  resetPasswordUrl: string;
  getLoggedinUserProfileUrl: string;
  onAuthGuardLoginUser?: (user: User) => void; // Also use this to prompt photographer to create PIN, add a button to "later" "dont show this again"
}
