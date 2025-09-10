import { atom } from "jotai";
import { User } from "../gql-types/graphql";

export const userAtom = atom<User | null>(null);
