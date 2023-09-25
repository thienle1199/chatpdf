import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { trpc } from "./_trpc/client";

export default function Home() {
  const { userId } = auth();
  const isAuth = !!userId;


  return (
    <main className="min-h-screen w-screen grid place-items-center">
            <ToastContainer theme="dark" position="top-right" />

      <div>
        <li>{isAuth && <UserButton />}</li>

        <h1 className="text-4xl font-bold">Welcome to Chat PDF</h1>
        <p>
          We&apos;re here to help you have a conversation with your document
        </p>

        <FileUpload />

        {!isAuth && (
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
