import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLError } from "graphql";
import { User } from "src/user-module/entities/user.entity";
import { Not, Repository } from "typeorm";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";


@Injectable()
export class ContactService {

    private relationsEntities = ['user'];

    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async makeContactPublic(uuid: string, user: User) {
        const contact = await this.contactRepository.findOne({
            where: {
                uuid,
                deleted: false,
                user
            },
            relations: this.relationsEntities
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
           where: {
               uuid,
               deleted: false,
               user
           },
           relations: this.relationsEntities
       }); 
    }

    getPublicContacts() {
        return this.contactRepository.find({
            where: {
                isPublic: true,
                deleted: false
            },
            relations: this.relationsEntities
        });
    }

    getAllContacts() {
        return this.contactRepository.find({
            where: {
                deleted: false
            },
            relations: this.relationsEntities
        });
    }
    getMyContacts(user: User) {
        return this.contactRepository.find({
            where: {
                deleted: false,
                user
            },
            relations: this.relationsEntities
        });
    }

    async deleteContact(uuid: string, user: User) {
        const dbContact = await this.contactRepository.findOne({
            where: {
                uuid,
                deleted: false,
                user
            },
            relations: this.relationsEntities
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