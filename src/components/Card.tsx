import type { ReactNode } from "react";
import RBCard from "react-bootstrap/Card";

function Card({ children }: { children: ReactNode }) {
  return <RBCard className="shadow-md p-3">{children}</RBCard>;
}

export default Card;
