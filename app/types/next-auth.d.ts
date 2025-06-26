import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
   interface Session {
      user: {
         id: string;
         role: string;
         name: string;
         email: string;
         image: string;
      };
   }

   interface User {
      id: string;
      role: string;
   }
}
