import { Container } from "react-bootstrap";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { useState } from "react";

function App() {
  const [username, setUserName] = useState<string>("facebook");

  return (
    <>
      <Container>
        <h1>Github Repo Explorer</h1>
        <SearchBar onSearch={setUserName} />
      </Container>
    </>
  );
}

export default App;
