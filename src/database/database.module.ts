import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, port, database, password, username } =
          configService.database;
        return {
          type: 'mariadb',
          host,
          port,
          username,
          password,
          database,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
