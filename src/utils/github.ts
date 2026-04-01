export function parseGitHubUrl(url: string) {
  // Extracts the owner and repo name from the URL
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) throw new Error("Invalid GitHub URL format.");
  
  // Clean up the repo name just in case they pasted a .git link
  const repo = match[2].replace('.git', '');
  return { owner: match[1], repo };
}

export async function getRepoContext(url: string) {
  const { owner, repo } = parseGitHubUrl(url);

  try {
    // 1. Fetch the Package.json (To see their tech stack & dependencies)
    const pkgResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`);
    let pkgContent = "No package.json found. (Might not be a Node/JS project).";
    
    if (pkgResponse.ok) {
      const pkgData = await pkgResponse.json();
      // GitHub sends files in base64 encoding, so we decode it into readable text
      pkgContent = Buffer.from(pkgData.content, 'base64').toString('utf-8');
    }

    // 2. Fetch the Root Folder Structure (To see their architecture)
    const treeResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`);
    let treeContent = "Folder structure unavailable.";
    
    if (treeResponse.ok) {
      const treeData = await treeResponse.json();
      // Create a clean bulleted list of files and folders
      treeContent = treeData.map((file: any) => `- ${file.name} (${file.type})`).join('\n');
    }

    // 3. Combine it into a clean payload for Gemini
    const finalPayload = `
    Repository: ${owner}/${repo}
    
    --- ROOT FOLDER STRUCTURE ---
    ${treeContent}
    
    --- PACKAGE.JSON DEPENDENCIES ---
    ${pkgContent}
    `;

    return finalPayload;

  } catch (error) {
    console.error("Failed to fetch from GitHub API:", error);
    return `Repository: ${owner}/${repo}\n\nError: Could not fetch repository data. It might be private or GitHub rate-limited the request.`;
  }
}