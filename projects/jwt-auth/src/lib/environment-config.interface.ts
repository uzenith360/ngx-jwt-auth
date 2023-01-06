export default interface EnvironmentConfig {
  tokenStoreId: string;
  loginUrl: string;
  logoutUrl: string;
  superAdminPages: string[];
  forgotPasswordUrl: string;
  resetPasswordUrl: string;
  getLoggedinUserProfileUrl: string;
}
