import { useState } from "react";
import { Button, Col, Dropdown, Form, Row, Spinner } from "react-bootstrap";

function SearchBar() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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
            <Button typeof="submit" >
              Search
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
