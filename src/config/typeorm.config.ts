import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';



export const typeOrmConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    synchronize: true,
    autoLoadEntities: true,
    ssl: process.env.POSTGRES_SSL === 'true',
    extra: {
        ssl:
            process.env.POSTGRES_SSL === 'true'
                ? {
                    rejectUnauthorized: false
                }
                : null
    },
    migrations: [join(__dirname + '/migrations/*{.ts,.js}')],
    migrationsRun: true,
});