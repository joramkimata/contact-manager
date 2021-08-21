import { Args, Mutation, Resolver } from "@nestjs/graphql";
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

}