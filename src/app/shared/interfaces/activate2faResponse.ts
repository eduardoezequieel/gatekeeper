export interface Activate2FaResponse {
  data: {
    twoFactorRecoveryKeys: [string];
  };
}
