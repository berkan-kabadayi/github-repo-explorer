import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

/* ---------- TYPES ---------- */

interface SearchBarProps {
  onSearch: (username: string) => void;
}

interface GitHubUser {
  login: string;
}

interface GitHubUserSearchResponse {
  items: GitHubUser[];
}

/* --------- COMPONENT ---------- */

function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (input.length < 3) {
      setSuggestion([]);
      setShowDropdown(false);
      return;
    }

    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            input
          )}&per_page=5`,
          { signal: controller.signal }
        );

        const data: GitHubUserSearchResponse = await response.json();

        if (data.items) {
          const users = data.items.map((user) => user.login);
          setSuggestion(users);
          setShowDropdown(users.length > 0);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [input]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setSuggestion([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (username: string) => {
    setInput(username);
    setSuggestion([]);
    setShowDropdown(false);
    onSearch(username);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Dropdown show={showDropdown}>
            <Form.Control
              type="text"
              placeholder="Enter your GitHub username..."
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Dropdown.Menu>
              {suggestion.map((item) => (
                <Dropdown.Item key={item} onClick={() => handleSelect(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          {loading ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </Button>
          ) : (
            <Button type="submit">Search</Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
