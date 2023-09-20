import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <main className="min-h-screen w-screen grid place-items-center">
      <div>
        <li>{isAuth && <UserButton />}</li>

        <h1 className="text-4xl font-bold">Welcome to Chat PDF</h1>
        <p>
          We&apos;re here to help you have a conversation with your document
        </p>

        {!isAuth && (
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </main>
  );
}
