import "./App.css";
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  Spinner,
} from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import { useEffect, useRef, useState } from "react";
import type { RepoProps } from "./components/RepoItem";
import RepoList from "./components/RepoList";

function App() {
  const [username, setUserName] = useState<string>("facebook");
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageRef = useRef<number>(1);

  const fetchRepos = async (user: string, page: number) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(
      `https://api.github.com/users/${user}/repos?page=${page}&per_page=6`
    );

    const data: RepoProps[] = await response.json();
    setRepos(data);
    setHasMore(data.length === 6);
  } catch (error) {
    setError(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  } finally {
    setLoading(false);
  }
};


useEffect(() => {
  pageRef.current = 1;
  fetchRepos(username, pageRef.current);
}, [username]);

const handlePrev = () => {
  if (pageRef.current > 1) {
    pageRef.current -= 1;
    fetchRepos(username, pageRef.current);
  }
};

const handleNext = () => {
  pageRef.current += 1;
  fetchRepos(username, pageRef.current);
};

  return (
    <>
      <Container>
        <h1>Github Repo Explorer</h1>
        <SearchBar onSearch={setUserName} />
        {loading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && <RepoList repos={repos} />}
        {!loading && repos.length > 0 && (
          <div className="d-flex justify-content-center mt-4">
            <ButtonGroup>
              <Button
                variant="secondary"
                disabled={pageRef.current === 1}
                onClick={handlePrev}
                style={{
                  minWidth: "120px",
                  marginRight: "8px",
                  borderRadius: "10px",
                }}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                disabled={!hasMore}
                onClick={handleNext}
                style={{ minWidth: "120px", borderRadius: "10px" }}
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
