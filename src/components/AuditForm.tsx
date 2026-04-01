"use client";

import { useState, useEffect } from "react";
import { generateAudit } from "../actions/audit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

// 🌟 Premium SVG icons for both Loading States and Markdown Badges
import { 
  Search, 
  Package, 
  BrainCircuit, 
  Zap, 
  ShieldAlert, 
  FileCode2, 
  AlertTriangle, 
  Info 
} from "lucide-react"; 

const LOADING_STEPS = [
  { text: "Analyzing repository structure...", icon: <Search className="w-5 h-5 animate-pulse text-blue-500" /> },
  { text: "Extracting package.json dependencies...", icon: <Package className="w-5 h-5 animate-pulse text-indigo-500" /> },
  { text: "Running Staff-Level architecture audit...", icon: <BrainCircuit className="w-5 h-5 animate-pulse text-purple-500" /> },
  { text: "Detecting Big O performance bottlenecks...", icon: <Zap className="w-5 h-5 animate-pulse text-amber-500" /> },
  { text: "Scanning for security vulnerabilities...", icon: <ShieldAlert className="w-5 h-5 animate-pulse text-red-500" /> },
  { text: "Formatting final Markdown report...", icon: <FileCode2 className="w-5 h-5 animate-pulse text-emerald-500" /> }
];

export default function AuditForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);

  // The timer that cycles the messages every 1.5 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStep(0); 
    }
    return () => clearInterval(interval);
  }, [loading]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReport("");

    try {
      const result = await generateAudit(url);

    if (result && result.success && result.report) { 
    setReport(result.report.markdownContent);
    } else {
    setError(result?.message || "The server rejected the request without a specific error.");
    }
    } catch (err: any) {
      setError(err.message || "The application crashed before the server could finish.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mt-8 flex flex-col items-center">
      {/* ✅ FIXED: Added flex-col sm:flex-row, max-w-3xl, and mx-auto for perfect centering */}
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mx-auto mb-8">
        {/* ✅ FIXED: Added flex-1 to the Input so it stretches properly */}
        <Input
          placeholder="Paste GitHub Repository URL (e.g., https://github.com/facebook/react)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1 bg-white border-slate-200 text-slate-900 h-12 text-lg shadow-sm focus-visible:ring-orange-500"
        />
        <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white h-12 px-8 text-lg font-medium shadow-sm transition-all whitespace-nowrap">
          {loading ? "Auditing..." : "Audit Code"}
        </Button>
      </form>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="w-full bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg mb-8 font-medium shadow-sm">
            🚨 Debug Error: {error}
        </div>
      )}

      {/* EMPTY PLACEHOLDER */}
      {!report && !loading && !error && (
        <div className="w-full border-2 border-dashed border-slate-200 rounded-xl p-16 flex flex-col items-center justify-center text-slate-400 bg-white/50">
          <FileCode2 className="w-12 h-12 mb-4 text-slate-300" />
          <p className="text-lg text-center">Your Staff-Level AI audit report will appear here.</p>
        </div>
      )}

      {/* LOADING UI */}
      {loading && (
        <div className="w-full border border-slate-200 rounded-xl p-16 flex flex-col items-center justify-center bg-white shadow-sm transition-all">
          <svg className="animate-spin h-8 w-8 mb-6 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 px-6 py-3 rounded-full border border-slate-100 shadow-sm">
            {LOADING_STEPS[loadingStep].icon}
            <p className="text-base">{LOADING_STEPS[loadingStep].text}</p>
          </div>
        </div>
      )}

      {/* REPORT DISPLAY */}
      {report && (
        <Card className="bg-white border-slate-200 shadow-xl w-full text-left overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <CardTitle className="text-xl font-semibold text-slate-800">Architecture & Security Report</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 px-4 sm:px-8 pb-10">
            <div className="flex flex-col gap-4 text-slate-700 leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-6 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-slate-800 [&>h4]:mt-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul>li]:mb-2 [&>p>code]:bg-slate-100 [&>p>code]:text-slate-800 [&>p>code]:px-1.5 [&>p>code]:py-0.5 [&>p>code]:rounded-md [&>pre]:bg-slate-900 [&>pre]:text-slate-200 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto">
              
              <ReactMarkdown 
                components={{
                  // 🌟 THE INTERCEPTOR: Watches for bold text and swaps it for UI Badges
                  strong: ({node, children, ...props}) => {
                    const text = String(children);
                    
                    if (text.includes('[CRITICAL]') || text.includes('[ CRITICAL ]')) {
                      return (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider border border-red-200 shadow-sm mb-1 mt-2">
                          <ShieldAlert className="w-3.5 h-3.5" /> Critical
                        </span>
                      );
                    }
                    if (text.includes('[WARNING]') || text.includes('[ WARNING ]')) {
                      return (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200 shadow-sm mb-1 mt-2">
                          <AlertTriangle className="w-3.5 h-3.5" /> Warning
                        </span>
                      );
                    }
                    if (text.includes('[INFO]') || text.includes('[ INFO ]')) {
                      return (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider border border-blue-200 shadow-sm mb-1 mt-2">
                          <Info className="w-3.5 h-3.5" /> Info
                        </span>
                      );
                    }
                    
                    // If it is just normal bold text, render it normally
                    return <strong className="font-bold text-slate-900" {...props}>{children}</strong>;
                  }
                }}
              >
                {report}
              </ReactMarkdown>

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}