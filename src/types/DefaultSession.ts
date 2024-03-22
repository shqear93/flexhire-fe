import {ISODateString} from "next-auth";
import User from "@/interfaces/User";


export interface DefaultSession {
  user: User | null
  expires: ISODateString
}