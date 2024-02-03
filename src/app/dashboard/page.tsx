import Button from "@mui/material/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      hi in the home page

      <Button variant="contained">Hello world</Button>
    </main>
  );
}
