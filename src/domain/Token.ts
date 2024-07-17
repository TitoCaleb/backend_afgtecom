export class Token {
  token: string;

  createdAt: Date;

  expiredAt: Date;

  deviceId: string;

  device_uid: string;

  constructor(data: Partial<Token>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
