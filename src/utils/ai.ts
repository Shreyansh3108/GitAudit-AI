import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const AUDIT_SYSTEM_PROMPT = `
You are a Staff-Level Software Engineer conducting a strict code audit.
Analyze the provided repository context (README, package.json, and structure).
Output a professional Markdown report.

Focus strictly on:
1. Architecture & Tech Stack Evaluation
2. Potential Big O Performance Bottlenecks
3. Security Vulnerabilities & Best Practices

Do not be overly polite. Be direct, highly technical, and concise.
Provide specific code snippets if suggesting improvements.
`;

export async function generateRepoAudit(repoContext: string) {
  if (!repoContext || repoContext.trim() === "") {
    throw new Error("Repository context is empty.");
  }

  const { text } = await generateText({
    model: google("gemini-1.5-pro"),
    system: AUDIT_SYSTEM_PROMPT,
    prompt: `Perform an audit on the following repository data:\n\n${repoContext}`,
    temperature: 0.2,
  });

  return text;
}