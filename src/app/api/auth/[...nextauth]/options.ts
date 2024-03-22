import type {NextAuthOptions} from 'next-auth'

import CredentialsProvider from 'next-auth/providers/credentials'
import {getUserByToken} from "@/lib/user";
import User from "@/interfaces/User";
import _ from "lodash";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // Docs: https://next-auth.js.org/configuration/providers/credentials
      name: "Credentials",
      type: "credentials",
      credentials: {
        token: {
          label: "Token:",
          type: "text",
          placeholder: "Your token here"
        }
      },

      // @ts-ignore
      async authorize(credentials, req): Promise<User | null> {
        let token = credentials?.token
        if (_.isEmpty(token)) return null
        const user = token ? await getUserByToken(token) : null;
        return user ? user : null;
      }
    })
  ],
}