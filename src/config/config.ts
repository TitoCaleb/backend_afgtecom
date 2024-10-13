import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    encryption: {
      key: process.env.ENCRYPTION_KEY,
      iv: process.env.ENCRYPTION_IV,
    },
    database: {
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
    nest: {
      port: parseInt(process.env.PORT),
    },
  };
});
