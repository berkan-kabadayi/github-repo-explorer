import { Container } from "react-bootstrap";
import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <Container>
        <h1>Github Repo Explorer</h1>
        <SearchBar />
      </Container>
    </>
  );
}

export default App;
