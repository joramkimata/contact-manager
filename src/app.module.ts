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
      introspection: true,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => {
        return {
          req,
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-3-211-221-185.compute-1.amazonaws.com',
      port: 5432,
      username: 'hpscuwkrdeniuj',
      password: '56855aac6c630ef4f707b77c292563d48c23f6d877d6a991dafe6769ae135aab',
      database: 'd7f841652gah1a',
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      ssl: {
        rejectUnauthorized: false
      },

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
