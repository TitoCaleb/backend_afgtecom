import { Device } from 'src/domain/Device';
import { Client } from 'src/domain/Client';

export class SecurityRepositoryImpl {
  private clients = [
    {
      clientId: 'clientId',
      clientSecret: 'clientSecret',
    },
  ];

  private device = [
    {
      id: 'deviceId',
      deviceName: 'device',
    },
  ];

  constructor() {}
  findClientByCredentials(request: Client): Promise<Client> {
    const response = this.clients.map((client) => {
      if (
        client.clientId === request.clientId &&
        client.clientSecret === request.clientSecret
      ) {
        return new Client(client);
      }
    });

    return Promise.resolve(response[0]);
  }

  findDeviceByCredentials(request: Device): Promise<Device> {
    const response = this.device.map((dev) => {
      if (dev.id === request.id && dev.deviceName === request.deviceName) {
        return new Device(dev);
      }
    });

    return Promise.resolve(response[0]);
  }
}
