import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";


@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>
    ){}

    createContact(createContactInput: ContactInput) {
        throw new Error("Method not implemented.");
    }
}