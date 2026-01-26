import { Col, Row } from "react-bootstrap";
import type { RepoProps } from "./RepoItem";
import Card from "./Card";
import RepoItem from "./RepoItem";

interface RepoListProps {
  repos: RepoProps[];
}

function RepoList({ repos }: RepoListProps) {
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {repos.map((repo) => (
          <Col key={repo.id}>
            <Card>
              <RepoItem repo={repo} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default RepoList;
