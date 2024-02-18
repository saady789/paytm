// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/prisma/client";
export const options = {
  providers: [
    // GitHubProvider({
    //   profile(profile) {
    //     console.log("Profile GitHub: ", profile);

    //     let userRole = "GitHub User";
    //     if (profile?.email == "jake@claritycoders.com") {
    //       userRole = "admin";
    //     }

    //     return {
    //       ...profile,
    //       role: userRole,
    //     };
    //   },
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_Secret,
    // }),
    // GoogleProvider({
    //   profile(profile) {
    //     console.log("Profile Google: ", profile);

    //     let userRole = "Google User";
    //     return {
    //       ...profile,
    //       id: profile.sub,
    //       role: userRole,
    //     };
    //   },
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_Secret,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        // console.log("Credentials: ", credentials);
  
        try {
          
          const foundUser = await prisma.user.findUnique({ where: { email: credentials.email } })
          
          if (foundUser && (foundUser.password==credentials.password) ) {
              console.log("Good Pass");
      
              // Return an object containing the user details
              return {
                ...foundUser,
                
              };
            
          }
        } catch (error) {
          // console.log(error);
        }
        return null;
      }
      
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages:{
    signIn: '/Login',
  },
  secret: env("SECRET"),
  session: {
    // Add session configuration if needed
    strategy: "jwt",
  },
};