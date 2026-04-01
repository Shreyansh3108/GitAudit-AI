"use client";

import { useState } from "react";
import { Check, Shield, Crown, GitMerge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Experience the full power of GitAudit AI for your personal projects.",
    prompts: "15 AI Audits per month",
    features: [
      "Full Architecture Analysis",
      "Deep Security Auditing",
      "Big O Performance Checks",
      "Markdown Report Export",
    ],
    cta: "Start Auditing for Free",
    icon: <GitMerge className="w-6 h-6 text-slate-500" />,
  },
  {
    name: "Pro",
    price: "$5",
    description: "Perfect for active developers and freelancers handling multiple repositories.",
    prompts: "30 AI Audits per month",
    features: [
      "Full Architecture Analysis",
      "Deep Security Auditing",
      "Big O Performance Checks",
      "Pro Badge on Dashboard",
    ],
    cta: "Upgrade to Pro",
    icon: <Shield className="w-6 h-6 text-orange-500" />,
  },
  {
    name: "Enterprise",
    price: "$10",
    description: "High-volume access for teams and engineers auditing code daily.",
    prompts: "70 AI Audits per month",
    features: [
      "Full Architecture Analysis",
      "Deep Security Auditing",
      "Big O Performance Checks",
      "Enterprise Badge on Dashboard",
    ],
    cta: "Upgrade to Enterprise",
    icon: <Crown className="w-6 h-6 text-amber-500" />,
  },
];

export default function PricingPage() {
  // ✅ NEW: Tracks which card is currently being hovered. Defaults to 1 (the Pro tier).
  const [hoveredIndex, setHoveredIndex] = useState<number>(1);

  // ✅ NEW: Placeholder function ready for Clerk/Stripe integration
  const handleCheckout = (tierName: string) => {
    console.log(`Initiating checkout for: ${tierName}`);
    // Next step: We will add Stripe redirect logic here!
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          One Engine. <span className="text-orange-500">Unrestricted Access.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Every tier gives you 100% access to our Staff-Level AI features. Just pick the plan that matches your monthly audit volume.
        </p>
      </div>

      {/* ✅ NEW: Reverts to highlighting 'Pro' when the mouse leaves the pricing section completely */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        onMouseLeave={() => setHoveredIndex(1)}
      >
        {tiers.map((tier, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <div 
              key={index} 
              onMouseEnter={() => setHoveredIndex(index)}
              className={cn(
                "relative p-8 rounded-3xl backdrop-blur-md transition-all duration-300 flex flex-col cursor-default",
                // Dynamic styling based on hover state
                isHovered 
                  ? "border-2 border-orange-500 shadow-2xl scale-105 z-10 bg-white" 
                  : "border border-slate-200/60 shadow-sm scale-100 z-0 bg-white/60 opacity-90"
              )}
            >
              {/* Only show "Most Popular" on the Pro tier when it is active */}
              {index === 1 && isHovered && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg whitespace-nowrap transition-opacity">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn(
                    "p-2 rounded-xl border transition-colors",
                    isHovered ? "bg-orange-50 border-orange-200" : "bg-slate-100/50 border-slate-200/50"
                  )}>
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{tier.name}</h3>
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                  <span className="text-slate-500 font-medium">/month</span>
                </div>
                
                <div className={cn(
                  "inline-block px-3 py-1 rounded-md text-sm font-bold mb-4 border transition-colors",
                  isHovered ? "bg-orange-100 text-orange-800 border-orange-200" : "bg-slate-100 text-slate-600 border-slate-200"
                )}>
                  {tier.prompts}
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="mt-0.5 bg-green-100 rounded-full p-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-green-700" strokeWidth={3} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleCheckout(tier.name)}
                className={cn(
                  "w-full h-12 rounded-xl font-bold text-base transition-all duration-300",
                  isHovered 
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 shadow-lg scale-100" 
                    : "bg-slate-800 text-white scale-95 opacity-80 hover:bg-slate-700"
                )}
              >
                {tier.cta}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}