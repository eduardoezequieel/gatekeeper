export interface Generate2FA {
  data: {
    qrImage: string;
    secretTwoFactorKey: string;
  };
}
