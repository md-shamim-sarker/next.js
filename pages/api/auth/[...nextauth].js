import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/userSchema";
import {compare} from "bcrypt";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => {error: "Connection Failed!";});

                // check user email
                const result = await Users.findOne({email: credentials.email});
                if(!result) {
                    throw new Error("No user found, please register.");
                }

                // check password
                const checkPassword = await compare(credentials.password, result.password);

                // incorrect password
                if(!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username and Password doesn't match");
                }
                return result;
            }
        })
    ],
};

export default NextAuth(authOptions);