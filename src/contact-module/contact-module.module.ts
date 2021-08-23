import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModuleModule } from 'src/auth-module/auth-module.module';
import { SharedModuleModule } from 'src/shared-module/shared-module.module';
import { Contact } from './entities/contact.entity';
import { ContactResolver } from './resolvers/contact.resolver';
import { ContactService } from './services/contact.service';

@Module({
    imports: [
        AuthModuleModule,
        TypeOrmModule.forFeature([
            Contact,
        ]),
    ],
    providers: [
        ContactService,
        ContactResolver
    ]
})
export class ContactModuleModule { }
