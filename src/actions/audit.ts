"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../lib/prisma";
import { getRepoContext, parseGitHubUrl } from "../utils/github";
import { generateRepoAudit } from "../utils/ai";

export async function generateAudit(url: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized. Please log in.");
  }

  const { owner, repo } = parseGitHubUrl(url);
  const repoContext = await getRepoContext(url);
  const reportContent = await generateRepoAudit(repoContext);

  const savedReport = await prisma.report.create({
    data: {
      userId: userId,
      repoName: `${owner}/${repo}`,
      repoUrl: url,
      content: reportContent,
    },
  });

  return { success: true, report: savedReport };
}