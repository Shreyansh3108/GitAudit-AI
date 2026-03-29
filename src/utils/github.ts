export function parseGitHubUrl(url: string) {
  const regex = /github\.com\/([^/]+)\/([^/]+)/;
  const match = url.match(regex);
  
  if (!match) {
    throw new Error("Invalid GitHub URL. Please provide a link to a public repository.");
  }
  
  return {
    owner: match[1],
    repo: match[2].replace(".git", ""),
  };
}

export async function getRepoContext(url: string) {
  const { owner, repo } = parseGitHubUrl(url);
  const filesToFetch = ["README.md", "package.json"];
  let context = `Repository: ${owner}/${repo}\n\n`;

  for (const file of filesToFetch) {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/main/${file}`
      );

      if (response.ok) {
        const content = await response.text();
        context += `--- File: ${file} ---\n${content}\n\n`;
      } else {
        const masterResponse = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/master/${file}`
        );
        
        if (masterResponse.ok) {
          const content = await masterResponse.text();
          context += `--- File: ${file} ---\n${content}\n\n`;
        }
      }
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    }
  }

  return context;
}