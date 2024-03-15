import { INewUser } from "@/types";
import { ID } from "appwrite"; //import ID from appwrite as appwrite already provides that for us
import { account, appwriteConfig, avatars, databases } from "./config";
//
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(), //unique identifier is from appwrite
      user.email, //email
      user.password, //password
      user.name //name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountID: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountID: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  //to save the user entries from newUser
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseID,
      appwriteConfig.userCollectionID,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.log(error);
  }
}
