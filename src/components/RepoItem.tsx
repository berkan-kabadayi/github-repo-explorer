interface RepoProps {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

function RepoItem({ repo }: { repo: RepoProps }) {
  return (
    <div>
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        {repo.name}
      </a>
      <p>{repo.description || "No Explantion"}</p>
    </div>
  );
}

export default RepoItem;
