"use client"

// import Button from "@mui/material/Button";
import CurrentUser from "@/components/CurrentUser";
import {signIn, useSession} from "next-auth/react";
import User from "@/interfaces/User";
import {Suspense} from "react";
import Loading from "@/app/(pages)/profile/loading";
// import {useContext} from "react";
// import UserContext from "@/context/UserContext";
// import {useAuth} from "@/hooks/useAuth";

export default function Profile() {
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/api/auth/signin')
  //   }
  // })

  const {data: session} = useSession()
  const user = session?.user as User | null

  // if (user) {
  //   return (
  //     <>
  //       Signed in as {user.email} <br/>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }
  // return (
  //   <>
  //     Not signed in <br/>
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // )


  // const sss = 'hhhh';


  // const session = await getServerSession(options)

  // if (!session) {
  //   redirect('/api/auth/signin')
  //   // return {
  //   //   redirect: {
  //   //     destination: '/api/auth/signin',
  //   //     permanent: false,
  //   //   },
  //   // }
  // }

  // const user = session.user

  // const help = 66

  // const {setUser} = useContext(UserContext);

  // const { user } = useAuth();

  // let user = getUserByToken('token').then((user) => {
  //   let y = user
  //   console.log('dddd');
  // });
  if (user) {
    return (
      <Suspense fallback={<Loading/>}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        Welcome to the profile page

        <CurrentUser user={user}/>

        {/*<Button variant="contained" onClick={login}>Login</Button>*/}
      </main>
      </Suspense>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    );
  }
}
