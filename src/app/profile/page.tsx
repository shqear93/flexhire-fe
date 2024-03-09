"use client"

import Button from "@mui/material/Button";
import CurrentUser from "@/components/CurrentUser";

export default function Profile() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      welcome to the profile page

      <CurrentUser/>

      <Button variant="contained">Hello world</Button>
    </main>
  );
}
