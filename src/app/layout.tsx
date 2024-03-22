// "use client"

import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {ThemeProvider} from '@mui/material/styles';
import {Inter} from "next/font/google";
import type {GetServerSideProps, Metadata, NextPageContext} from "next";
import theme from '../theme';
import "./globals.css";
import UserContext, {UserProvider} from "@/context/UserContext";
import {useAuth} from "@/hooks/useAuth";
import {redirect, useServerInsertedHTML} from "next/navigation";
import MyLayoutContainer from "@/layouts/MyLayoutContainer";
import AuthProvider from "@/context/AuthProvider";
import CurrentUser from "@/components/CurrentUser";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {DefaultSession} from "@/types/DefaultSession";
import {useContext} from "react";
// import {useEffect, useState} from "react";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s | Khaled Demo",
  },
  description: "Generated by create next app",
};

// RootLayout.getInitialProps = async (ctx: NextPageContext) => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }

// export const getServerSideProps = (async () => {
//   return { props: { repo: 'hiiii' } }
// }) satisfies GetServerSideProps<{ repo: string }>

// export const getServerData: GetServerData = async (context) => {
//   const { req } = context;
//   const cookies = req.cookies; // Access cookies from the request
//   return { data: { userCookie: cookies['userCookie'] } };
// };

// export async function getServerData() {
//   const data = await fetchData();
//   return { props: { data } };
// }

// export const getServerSideProps = async () => { return {test: 'hello'}}

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  const {user, setUser} = useContext(UserContext);

  const session = await getServerSession(options) as DefaultSession

  if (!session) redirect('/api/auth/signin')

  const {user: sessionUser} = session

  if (sessionUser) {
    setUser(sessionUser)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {/*<MyLayoutContainer>*/}
            {/*<UserProvider>*/}
            <AuthProvider>

              <CurrentUser user={user}/>

              {/*<SoftUIControllerProvider>*/}
              {children}
              {/*</SoftUIControllerProvider>*/}

            </AuthProvider>
            {/*</UserProvider>*/}
            {/*</MyLayoutContainer>*/}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
