import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import AuditForm from "@/components/AuditForm";
// ✅ IMPORTED NEW ICONS FOR TAGLINES AND FOOTER
import { Shield, Zap, FileCode2, GitMerge } from "lucide-react"; 

export default async function Home() {
  const { userId } = await auth();

  return (
    // ✅ WRAPPED THE WHOLE PAGE IN A FLEX CONTAINER SO THE FOOTER PUSHES TO THE BOTTOM
    <div className="w-full flex flex-col min-h-[calc(100vh-64px)]">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center w-full max-w-6xl mx-auto px-4 py-12 md:py-20 text-slate-900">
        
        {/* === LOGGED OUT STATE === */}
        {!userId ? (
          <div className="flex flex-col items-center text-center mt-8 md:mt-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">
              AI-Powered Code Architecture Analysis
            </h2>
            <p className="text-slate-600 mb-8 text-xl max-w-2xl">
              Instantly evaluate the tech stack, detect performance bottlenecks, and identify security vulnerabilities in any public GitHub repository.
            </p>
            
            {/* 🌟 NEW TAGLINES / BADGES */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Shield className="w-4 h-4 text-orange-500"/> Security Checks
              </span>
              <span className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Zap className="w-4 h-4 text-orange-500"/> Big O Performance
              </span>
              <span className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <FileCode2 className="w-4 h-4 text-orange-500"/> Architecture Review
              </span>
            </div>

            <div className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition cursor-pointer text-lg shadow-md hover:shadow-lg">
              <SignInButton mode="modal">
                <button>Get Started</button>
              </SignInButton>
            </div>
          </div>
        ) : (
          
        /* === LOGGED IN STATE === */
          <div className="flex flex-col items-center w-full mt-8 md:mt-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 tracking-tight text-center">
              Analyze Repository
            </h2>
            <p className="text-slate-600 mb-6 text-lg text-center max-w-xl">
              Enter a public GitHub URL to generate a comprehensive Staff-Level audit.
            </p>
            
            {/* 🌟 NEW TAGLINES / BADGES */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm font-medium text-slate-600">
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Shield className="w-4 h-4 text-orange-500"/> Security Checks
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <Zap className="w-4 h-4 text-orange-500"/> Big O Performance
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <FileCode2 className="w-4 h-4 text-orange-500"/> Architecture Review
              </span>
            </div>

            <div className="w-full max-w-3xl">
              <AuditForm />
            </div>
          </div>
        )}
      </div>

      {/* 🌟 THE NEW DARK FOOTER (Only renders on this page!) */}
      <footer className="w-full bg-slate-950 text-slate-400 py-12 md:py-16 mt-auto">
        <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-orange-500 p-1.5 rounded-lg w-max">
                <GitMerge className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                GitAudit <span className="text-orange-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI-powered Staff Engineer that audits your GitHub repositories. Detect vulnerabilities, optimize Big O performance, and enforce clean architecture in seconds.
            </p>
          </div>

          {/* Links Section 1 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-slate-50 font-semibold mb-2">Product</h4>
            <a href="/features" className="text-sm hover:text-orange-500 transition-colors">Features</a>
            <a href="/pricing" className="text-sm hover:text-orange-500 transition-colors">Pricing</a>
            <a href="#" className="text-sm hover:text-orange-500 transition-colors">Enterprise API</a>
          </div>

          {/* Links Section 2 */}
          <div className="flex flex-col gap-3">
            <h4 className="text-slate-50 font-semibold mb-2">Legal & Support</h4>
            <a href="#" className="text-sm hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm hover:text-orange-500 transition-colors">Contact Us</a>
          </div>

        </div>
        
        {/* Bottom Copyright Bar */}
        <div className="container mx-auto max-w-6xl px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} GitAudit AI. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built for developers, by developers.</p>
        </div>
      </footer>
      
    </div>
  );
}