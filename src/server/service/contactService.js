import "server-only";
import { createContactRepository, getContactsRepository, getContactByIdRepository } from "../repository/contactRepository";

export const createContactService = async (data) => {
    return await createContactRepository(data);
};

export const getContactsService = async () => {
    return await getContactsRepository();
};

export const getContactByIdService = async (id) => {
    return await getContactByIdRepository(id);
};