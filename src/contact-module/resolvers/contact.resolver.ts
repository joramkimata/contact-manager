import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";
import { ContactService } from "../services/contact.service";


@Resolver(of => Contact)
export class ContactResolver {

    constructor(
        private contactService: ContactService
    ) {}

    @Mutation(returns => Contact)
    createContact(
        @Args('createContactInput') createContactInput: ContactInput
    ) {
        return this.contactService.createContact(createContactInput);
    }

    @Mutation(returns => Contact)
    updateContact(
        @Args('uuid') uuid: string,
        @Args('createContactInput') createContactInput: ContactInput
    ) {
        return this.contactService.updateContact(uuid, createContactInput);
    }

    @Mutation(returns => Contact)
    deleteContact(
        @Args('uuid') uuid: string,
    ) {
        return this.contactService.deleteContact(uuid);
    }

    @Mutation(returns => Contact)
    makeContactPublic(
        @Args('uuid') uuid: string,
    ) {
        return this.contactService.makeContactPublic(uuid);
    }

    // Queries

    @Query(returns => [Contact])
    getMyContacts() {
        return this.contactService.getMyContacts();
    }   
    
    @Query(returns => [Contact])
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @Query(returns => [Contact])
    getPublicContacts() {
        return this.contactService.getPublicContacts();
    }

    @Query(returns => Contact, {nullable: true})
    getOneContract(
        @Args('uuid') uuid: string
    ) {
        return this.contactService.getOneContract(uuid);
    }
}