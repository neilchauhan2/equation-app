import { useEffect, useRef, useState } from "react";
import Card from "./components/Card"
import ConnectingEdge from "./components/ConnectingEdge";

type CardType = {
  equation: string;
  nextFunction: string;
  title: string;
  cardRef: React.RefObject<HTMLDivElement>;
}

type Edge = {
  from: React.RefObject<HTMLDivElement>;
  to: React.RefObject<HTMLDivElement>;
  curveType: "Quadratic" | "Cubic"
}




function App() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [cards, setCards] = useState<CardType[]>(prepareCards());

  function prepareCards() {
    return [...Array(5)].map((_, index) => ({
      equation: "",
      nextFunction: `Function ${index + 2}`,
      title: `Function ${index + 1}`,
      cardRef: useRef(null)
    }))
  }

  function prepareEdges() {
    const edges: Edge[] = [
      {
        from: cards[0].cardRef,
        to: cards[1].cardRef,
        curveType: "Quadratic"
      },
      {
        from: cards[1].cardRef,
        to: cards[3].cardRef,
        curveType: "Cubic"
      },
      {
        from: cards[3].cardRef,
        to: cards[4].cardRef,
        curveType: "Quadratic"
      },
      {
        from: cards[4].cardRef,
        to: cards[2].cardRef,
        curveType: "Quadratic"
      }
    ];

    return edges;
  }

  useEffect(() => {
    setEdges(prepareEdges());
  }, [cards])

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-44 gap-y-8 m-16">
      {cards.map((card, index) => (
        <Card key={index} cardRef={card.cardRef} cardData={{
          equation: card.equation,
          nextFunction: card.nextFunction,
          title: card.title
        }} />
      ))}
      {edges.length > 0 && edges.map((edge, index) => (
        <ConnectingEdge key={index} from={edge.from} to={edge.to} curveType={edge.curveType} />
      ))}
    </div>
  )
}

export default App
