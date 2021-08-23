import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GroupName, HasPermission } from "src/user-module/decorators/has-permission.decorator";
import { PermissionGuard } from "src/auth-module/guards/permission.guard";
import { Contact } from "../entities/contact.entity";
import { ContactInput } from "../inputs/contact.input";
import { ContactService } from "../services/contact.service";
import { GetCurrentUser } from "src/auth-module/decorators/get-user-graphql.decorator";
import { User } from "src/user-module/entities/user.entity";
import { GqlAuthGuard } from "src/auth-module/guards/gql-auth.guard";




@Resolver(of => Contact)
export class ContactResolver {

    constructor(
        private contactService: ContactService
    ) {}


    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @HasPermission({
        name: 'ROLE_CREATE_CONTACTS',
        displayName: 'Can create contacts',
        groupName: GroupName.CONTACTS
    })
    @Mutation(returns => Contact)
    createContact(
        @Args('createContactInput') createContactInput: ContactInput,
        @GetCurrentUser() user: User
    ) {
        return this.contactService.createContact(createContactInput, user);
    }

    @HasPermission({
        name: 'ROLE_UPDATE_CONTACTS',
        displayName: 'Can update contacts',
        groupName: GroupName.CONTACTS
    })
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @Mutation(returns => Contact)
    updateContact(
        @Args('uuid') uuid: string,
        @Args('updateContactInput') updateContactInput: ContactInput,
        @GetCurrentUser() user: User
    ) {
        return this.contactService.updateContact(uuid, updateContactInput, user);
    }

    @HasPermission({
        name: 'ROLE_DELETE_CONTACTS',
        displayName: 'Can delete contacts',
        groupName: GroupName.CONTACTS
    })
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @Mutation(returns => Contact)
    deleteContact(
        @Args('uuid') uuid: string,
        @GetCurrentUser() user: User
    ) {
        return this.contactService.deleteContact(uuid, user);
    }

    @HasPermission({
        name: 'ROLE_MAKE_PUBLIC_CONTACTS',
        displayName: 'Can make public contacts',
        groupName: GroupName.CONTACTS
    })
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @Mutation(returns => Contact)
    makeContactPublic(
        @Args('uuid') uuid: string,
        @GetCurrentUser() user: User
    ) {
        return this.contactService.makeContactPublic(uuid, user);
    }

    // Queries

    @HasPermission({
        name: 'ROLE_MY_VIEW_CONTACTS',
        displayName: 'Can my view contacts',
        groupName: GroupName.CONTACTS
    })
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @Query(returns => [Contact])
    getMyContacts(
        @GetCurrentUser() user: User
    ) {
        return this.contactService.getMyContacts(user);
    }   
    
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @Query(returns => [Contact])
    getAllContacts() {
        return this.contactService.getAllContacts();
    }

    @Query(returns => [Contact])
    getPublicContacts() {
        return this.contactService.getPublicContacts();
    }

    @HasPermission({
        name: 'ROLE_VIEW_CONTACT',
        displayName: 'Can view contact',
        groupName: GroupName.CONTACTS
    })
    @HasPermission({
        name: 'ROLE_VIEW_CONTACTS',
        displayName: 'Can view contacts',
        groupName: GroupName.CONTACTS
    })
    @UseGuards(GqlAuthGuard,PermissionGuard)
    @Query(returns => Contact, {nullable: true})
    getOneContract(
        @Args('uuid') uuid: string,
        @GetCurrentUser() user: User
    ) {
        return this.contactService.getOneContract(uuid, user);
    }
}