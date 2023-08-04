import { User } from "./user.interface";

export interface EnvironmentConfig {
  authIdName: string,
  tokenStoreId: string;
  loginUrl: string;
  logoutUrl: string;
  interceptorSkipUrls?: string[];
  superAdminPages: string[];
  forgotPasswordUrl: string;
  resetPasswordUrl: string;
  getLoggedinUserProfileUrl: string;
  onAuthGuardLoginUser?: (user: User) => void;
}
