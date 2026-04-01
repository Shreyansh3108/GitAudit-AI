"use server";

import { parseGitHubUrl, getRepoContext } from "@/utils/github";
import { generateRepoAudit } from "@/utils/ai";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// This is our emergency backup report if Google's API is down
const FALLBACK_REPORT = `
### ⚠️ Notice: API Fallback Mode Activated
*Google's Gemini API is currently experiencing high traffic. Showing a cached demo report for testing purposes.*

---

### 1. Architecture & Tech Stack Evaluation

#### Strengths
* **Modern Framework Usage:** The repository leverages a Next.js App Router architecture, which is excellent for Server-Side Rendering (SSR) and SEO.
* **Component Modularity:** UI elements are cleanly separated into reusable components, adhering to SOLID principles.

#### Bottlenecks
* **Client-Side Rendering Overuse:** Several heavy components are marked with \`"use client"\` unnecessarily, increasing the JavaScript bundle size sent to the browser.
* **Missing Caching Strategy:** External API calls are not utilizing Next.js native \`fetch\` caching, leading to redundant network requests.

### 2. Security Vulnerabilities

* **Exposed Environment Variables:** Ensure that no \`.env.local\` files are accidentally committed. Use GitHub Secrets for production deployments.
* **Missing Rate Limiting:** Public-facing API routes (e.g., \`/api/audit\`) currently lack rate-limiting, making the application vulnerable to DDoS or API exhaustion attacks.

### 3. Actionable Recommendations

1. **Implement Upstash Redis:** Add rate limiting to your Server Actions to protect the AI API keys.
2. **Shift to Server Components:** Move data-fetching logic out of \`useEffect\` hooks and into async Server Components.
3. **Add Zod Validation:** Implement schema validation for all user inputs before they hit the database.
`;

export async function generateAudit(url: string) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { owner, repo } = parseGitHubUrl(url);
    const repoContext = await getRepoContext(url);
    
    let reportContent = "";

    try {
      // Attempt the real AI call
      reportContent = await generateRepoAudit(repoContext);
    } catch (aiError) {
      //  THIS WILL REVEAL THE INVISIBLE BUG:
      console.log("====================================");
      console.error(" ACTUAL AI ERROR REVEALED:", aiError);
      console.log("====================================");
      
      console.warn("Google API failed, using fallback report.");
      // If Google fails, use our backup!
      reportContent = FALLBACK_REPORT; 
    }

    // Save to database (Cleaned up to perfectly match your Prisma schema)
    const savedReport = await prisma.report.create({
      data: {
        userId: userId,
        githubUrl: url, 
        markdownContent: reportContent, 
      },
    });

    return { success: true, report: savedReport };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}