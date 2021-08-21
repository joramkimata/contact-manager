import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { Not, Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";


@Injectable()
export class ContactService {

    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async makeContactPublic(uuid: string) {
        const contact = await this.contactRepository.findOne({
            uuid,
            deleted: false
        });

        if(!contact) {
            return new GraphQLError(`Contact not found`);
        }

        contact.isPublic = true;
        const savedContact = await this.contactRepository.save(contact);
        return savedContact;
    }


    getOneContract(uuid: string) {
       return this.contactRepository.findOne({
            uuid,
            deleted: false
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
    getMyContacts() {
        throw new Error("Method not implemented.");
    }

    async deleteContact(uuid: string) {
        const dbContact = await this.contactRepository.findOne({
            uuid,
            deleted: false
        });

        if (!dbContact) {
            return new GraphQLError(`Contact not found`);
        }

        dbContact.deleted = true;
        const savedContact = await this.contactRepository.save(dbContact);
        return savedContact;
    }

    async updateContact(uuid: string, createContactInput: ContactInput) {
        const { phoneNumber } = createContactInput;

        const dbContact = await this.contactRepository.findOne({
            uuid,
            deleted: false
        });

        if (!dbContact) {
            return new GraphQLError(`Contact not found`);
        }

        const contact = await this.contactRepository.findOne({
            phoneNumber,
            uuid: Not(uuid),
            deleted: false
        });

        if (contact) {
            return new GraphQLError(`Contact exists`);
        }

        dbContact.phoneNumber = phoneNumber;
        const savedContact = await this.contactRepository.save(dbContact);
        return savedContact;
    }

    async createContact(createContactInput: ContactInput) {
        const { phoneNumber } = createContactInput;

        const contact = await this.contactRepository.findOne({
            phoneNumber,
            deleted: false
        });

        if (contact) {
            return new GraphQLError(`Contact exists`);
        }

        const newContact = new Contact();

        newContact.phoneNumber = phoneNumber;

        const savedContact = await this.contactRepository.save(newContact);

        return savedContact;
    }
}