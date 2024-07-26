import config from './config/config';
import { Module } from '@nestjs/common';

import { SecurityModule } from './modules/security/security.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BaseModule } from './modules/base/base.module';
import { UsersModule } from './modules/users/users.module';
import enviroments from './config/enviroments';

@Module({
  imports: [
    SecurityModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[process.env.NODE_ENV] || './env/.env',
      load: [config],
    }),
    BaseModule,
    UsersModule,
  ],
})
export class AppModule {}
