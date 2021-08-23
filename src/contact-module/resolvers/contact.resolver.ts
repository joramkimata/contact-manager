import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GroupName, HasPermission } from "src/user-module/decorators/has-permission.decorator";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";
import { ContactService } from "../services/contact.service";



@HasPermission({
    name: 'ROLE_VIEW_CONTACTS',
    displayName: 'Can view contacts',
    groupName: GroupName.CONTACTS
})
@Resolver(of => Contact)
export class ContactResolver {

    constructor(
        private contactService: ContactService
    ) {}


    @HasPermission({
        name: 'ROLE_CREATE_CONTACTS',
        displayName: 'Can create contacts',
        groupName: GroupName.CONTACTS
    })
    @Mutation(returns => Contact)
    createContact(
        @Args('createContactInput') createContactInput: ContactInput
    ) {
        return this.contactService.createContact(createContactInput);
    }

    @HasPermission({
        name: 'ROLE_UPDATE_CONTACTS',
        displayName: 'Can update contacts',
        groupName: GroupName.CONTACTS
    })
    @Mutation(returns => Contact)
    updateContact(
        @Args('uuid') uuid: string,
        @Args('updateContactInput') updateContactInput: ContactInput
    ) {
        return this.contactService.updateContact(uuid, updateContactInput);
    }

    @HasPermission({
        name: 'ROLE_DELETE_CONTACTS',
        displayName: 'Can delete contacts',
        groupName: GroupName.CONTACTS
    })
    @Mutation(returns => Contact)
    deleteContact(
        @Args('uuid') uuid: string,
    ) {
        return this.contactService.deleteContact(uuid);
    }

    @HasPermission({
        name: 'ROLE_MAKE_PUBLIC_CONTACTS',
        displayName: 'Can make public contacts',
        groupName: GroupName.CONTACTS
    })
    @Mutation(returns => Contact)
    makeContactPublic(
        @Args('uuid') uuid: string,
    ) {
        return this.contactService.makeContactPublic(uuid);
    }

    // Queries

    @HasPermission({
        name: 'ROLE_MY_VIEW_CONTACTS',
        displayName: 'Can my view contacts',
        groupName: GroupName.CONTACTS
    })
    @Query(returns => [Contact])
    getMyContacts() {
        return this.contactService.getMyContacts();
    }   
    
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @Query(returns => [Contact])
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @HasPermission({
        name: 'ROLE_VIEW_PUBLIC_CONTACTS',
        displayName: 'Can view public contacts',
        groupName: GroupName.CONTACTS
    })
    @Query(returns => [Contact])
    getPublicContacts() {
        return this.contactService.getPublicContacts();
    }

    @HasPermission({
        name: 'ROLE_VIEW_CONTACT',
        displayName: 'Can view contact',
        groupName: GroupName.CONTACTS
    })
    @Query(returns => Contact, {nullable: true})
    getOneContract(
        @Args('uuid') uuid: string
    ) {
        return this.contactService.getOneContract(uuid);
    }
}