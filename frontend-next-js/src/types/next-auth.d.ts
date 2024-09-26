import type { DefaultSession } from "next-auth";
// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { JWT } from "next-auth/jwt";

interface UserData {
    id: string;
    email: string;
    name: string;
    lastName: string;
    favoritedModels: string[];
    predictions: any[];
}

declare module "next-auth" {
	/**
	 * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
        accessToken: string;
		user: {
            user_data: UserData;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession["user"];
	}
}

declare module "next-auth" {
    interface User {
        token: string;
        user: UserData;
    }
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		/** Custom JWT **/
        accessToken: string;
        user: UserData;
	}
}