import { InjectionToken } from "@angular/core";
import { EnvironmentConfig } from "./environment-config.interface";

export const EnvironmentConfigService = new InjectionToken<EnvironmentConfig>('EnvironmentConfig');

// export default EnvironmentConfigService;
