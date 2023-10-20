import { removeUser } from "../helpers/authentication";


export const Logout = async () => {

    await removeUser();

    return;

}