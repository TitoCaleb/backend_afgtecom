import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    encryption: {
      key: process.env.ENCRYPTION_KEY,
      iv: process.env.ENCRYPTION_IV,
    },
    database: {
      root: process.env.MYSQL_ROOT_PASSWORD,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT),
      host: process.env.MYSQL_HOST,
    },
  };
});
