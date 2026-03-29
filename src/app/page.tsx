import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  // In Clerk v6 and Next.js 16, we use auth() to securely check login status
  const { userId } = await auth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <h1 className="text-5xl font-bold mb-4">GitAudit AI</h1>
      <p className="text-slate-400 mb-8">AI-Powered Code Architecture Analysis</p>

      {/* If there is no userId, the user is NOT logged in */}
      {!userId ? (
        <div className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
          <SignInButton mode="modal" />
        </div>
      ) : (
        /* If there IS a userId, the user IS logged in */
        <div className="flex flex-col items-center gap-4 bg-slate-900 p-8 rounded-xl border border-slate-800">
          <p className="text-xl text-green-400 font-medium">Authentication Successful!</p>
          <p>You are logged in and ready to audit code.</p>
          <UserButton />
        </div>
      )}
    </main>
  );
}