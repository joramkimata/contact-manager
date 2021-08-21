import { Module } from '@nestjs/common';
import { AuthModuleModule } from './auth-module/auth-module.module';
import { UserModuleModule } from './user-module/user-module.module';
import { ContactModuleModule } from './contact-module/contact-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModuleModule } from './shared-module/shared-module.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'contact_manager',
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      //autoLoadEntities: true, // With that option specified, every entity registered through the forFeature() method will be automatically added to the entities array of the configuration object.
      synchronize: true,
    }),
    AuthModuleModule, 
    UserModuleModule, 
    ContactModuleModule, SharedModuleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
