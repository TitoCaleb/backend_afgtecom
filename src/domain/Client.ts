export class Client {
  id: string;

  clientId: string;

  clientSecret: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: Partial<Client>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
