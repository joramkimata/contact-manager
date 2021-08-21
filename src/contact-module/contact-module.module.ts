import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactService } from './services/contact.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Contact
        ]),
    ],
    providers: [
        ContactService
    ]
})
export class ContactModuleModule { }
