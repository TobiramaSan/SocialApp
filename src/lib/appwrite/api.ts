import { INewUser } from "@/types";
import { ID } from "appwrite"; //import ID from appwrite as appwrite already provides that for us
import { account } from "./config";
//
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(), //unique identifier is from appwrite
      user.email, //email
      user.password, //password
      user.name //name
    );
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
