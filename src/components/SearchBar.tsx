import { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

function SearchBar() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (input.length < 3) {
      setSuggestions([]);
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
        const data = await response.json();
        if (data.items) {
          const users = data.items.map((user) => user.login);
          setSuggestions(users);
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

  return (
    <Form>
      <Row>
        <Col>
          <Dropdown>
            <Form.Control
              type="text"
              placeholder="Enter your GitHub username..."
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
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
            <Button typeof="submit">Search</Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
