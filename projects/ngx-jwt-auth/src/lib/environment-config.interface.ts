export interface EnvironmentConfig {
  authIdName: string,
  tokenStoreId: string;
  loginUrl: string;
  logoutUrl: string;
  superAdminPages: string[];
  forgotPasswordUrl: string;
  resetPasswordUrl: string;
  getLoggedinUserProfileUrl: string;
}
