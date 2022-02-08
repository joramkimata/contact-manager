import { Module } from '@nestjs/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { UserModuleModule } from './user-module/user-module.module';
import { ContactModuleModule } from './contact-module/contact-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => {

        return {
          req,
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      //autoLoadEntities: true, // With that option specified, every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
      synchronize: true,
    }),
    AuthModuleModule,
    UserModuleModule,
    ContactModuleModule,
    SharedModuleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
