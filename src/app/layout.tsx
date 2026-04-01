import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ClerkProvider, SignInButton, Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { GitMerge, Crown, Shield } from "lucide-react"; 
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitAudit AI",
  description: "Staff-Level AI-powered GitHub repository auditing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ FIXED: Changed to a generic string type so TypeScript stops crashing the Vercel build!
  // It is currently set to "free". Once the site is live, we will hook this up to Prisma/Stripe.
  const userTier: string = "free"; 

  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        {/* Full-screen, soft gradient background to the entire body */}
        <body className={cn(
          inter.className, 
          "min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-slate-50"
        )}>
          
          {/* Transparent frosted glass header */}
          <header className="sticky top-0 z-50 w-full border-b border-orange-100/50 bg-white/20 backdrop-blur-xl shadow-sm">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
              
              {/* LEFT SIDE: Logo & Premium Badge */}
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                  <div className="bg-orange-500 p-1.5 rounded-lg">
                    <GitMerge className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-bold text-xl tracking-tight text-slate-900">
                    GitAudit <span className="text-orange-500">AI</span>
                  </span>
                </Link>

                {/* DYNAMIC PREMIUM BADGES */}
                {userTier === "silver" && (
                  <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600 border border-slate-200 shadow-sm uppercase tracking-wide cursor-default">
                    <Shield className="w-3.5 h-3.5" /> Pro ($5)
                  </div>
                )}
                {userTier === "gold" && (
                  <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-300 shadow-sm uppercase tracking-wide cursor-default">
                    <Crown className="w-3.5 h-3.5 text-amber-600" /> Enterprise ($10)
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Navigation & Clerk Auth */}
              <nav className="flex items-center gap-6">
                <Link 
                  href="/features" 
                  className="hidden md:block text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
                >
                  Features
                </Link>
                <Link 
                  href="/pricing" 
                  className="hidden md:block text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
                >
                  Pricing
                </Link>

                {/* CLERK AUTHENTICATION */}
                <div className="pl-4 border-l border-slate-200 flex items-center gap-4">
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignInButton mode="modal">
                      <button className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
                        Get Started
                      </button>
                    </SignInButton>
                  </Show>
                  
                  <Show when="signed-in">
                    <UserButton />
                  </Show>
                </div>
              </nav>

            </div>
          </header>

          {/* Ensure main container stretches full width */}
          <main className="flex-1 flex flex-col w-full items-center">
            {children}
          </main>

        </body>
      </html>
    </ClerkProvider>
  );
}