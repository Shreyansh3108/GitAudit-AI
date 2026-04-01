// src/app/features/page.tsx
import { Shield, Zap, Code, GitBranch } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-orange-500" />,
      title: "Deep Code Analysis",
      description: "Our AI scans your repository line-by-line to find anti-patterns, security flaws, and performance bottlenecks."
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      title: "Instant Refactoring",
      description: "Get staff-level recommendations for refactoring messy components into clean, scalable architecture."
    },
    {
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      title: "Security Auditing",
      description: "Identify leaked secrets, vulnerable dependencies, and unsafe data handling before they reach production."
    },
    {
      icon: <GitBranch className="h-6 w-6 text-orange-500" />,
      title: "PR Summaries",
      description: "Generate crystal-clear, executive-ready summaries of massive pull requests in seconds."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Supercharge Your Workflow
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          GitAudit AI acts as your personal Staff Engineer, reviewing code, catching bugs, and writing documentation so you can focus on building.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-orange-100/50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-orange-200/50">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}