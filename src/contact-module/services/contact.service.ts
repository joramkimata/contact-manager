import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { User } from "src/user-module/entities/user.entity";
import { Not, Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";


@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async makeContactPublic(uuid: string, user: User) {
        const contact = await this.contactRepository.findOne({
            uuid,
            deleted: false,
            user
        });

        if(!contact) {
            return new GraphQLError(`Contact not found`);
        }

        contact.isPublic = true;
        contact.user = user;
        const savedContact = await this.contactRepository.save(contact);
        return savedContact;
    }


    getOneContract(uuid: string, user: User) {
       return this.contactRepository.findOne({
            uuid,
            deleted: false,
            user
       }); 
    }

    getPublicContacts() {
        return this.contactRepository.find({
            isPublic: true,
            deleted: false
        });
    }

    getAllContacts() {
        return this.contactRepository.find({
            deleted: false
        });
    }
    getMyContacts(user: User) {
        return this.contactRepository.find({
            deleted: false,
            user
        });
    }

    async deleteContact(uuid: string, user: User) {
        const dbContact = await this.contactRepository.findOne({
            uuid,
            deleted: false,
            user
        });

        if (!dbContact) {
            return new GraphQLError(`Contact not found`);
        }

        dbContact.deleted = true;
        dbContact.user = user;
        const savedContact = await this.contactRepository.save(dbContact);
        return savedContact;
    }

    async updateContact(uuid: string, createContactInput: ContactInput, user: User) {
        const { phoneNumber } = createContactInput;

        const dbContact = await this.contactRepository.findOne({
            uuid,
            deleted: false,
            user
        });

        if (!dbContact) {
            return new GraphQLError(`Contact not found`);
        }

        const contact = await this.contactRepository.findOne({
            phoneNumber,
            uuid: Not(uuid),
            deleted: false,
            user
        });

        if (contact) {
            return new GraphQLError(`Contact exists`);
        }

        dbContact.phoneNumber = phoneNumber;
        dbContact.user = user;
        const savedContact = await this.contactRepository.save(dbContact);
        return savedContact;
    }

    async createContact(createContactInput: ContactInput, user: User) {
        const { phoneNumber } = createContactInput;

        const contact = await this.contactRepository.findOne({
            phoneNumber,
            deleted: false,
            user
        });

        if (contact) {
            return new GraphQLError(`Contact exists`);
        }

        const newContact = new Contact();

        newContact.phoneNumber = phoneNumber;
        newContact.user = user;

        const savedContact = await this.contactRepository.save(newContact);

        return savedContact;
    }
}