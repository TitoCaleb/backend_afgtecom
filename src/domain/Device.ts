export class Device {
  id: string;

  deviceName: string;

  constructor(data: Partial<Device>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
