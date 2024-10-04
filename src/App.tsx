import { useEffect, useRef, useState } from "react";
import Card from "./components/Card"
import ConnectingEdge from "./components/ConnectingEdge";
import IOCard from "./components/IOCard";

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
  edgeType: 'input' | 'output' | 'equation'
}




function App() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [cards, _] = useState<CardType[]>(prepareCards());
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);

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
        from: inputRef,
        to: cards[0].cardRef,
        curveType: "Quadratic",
        edgeType: 'input'
      },
      {
        from: cards[0].cardRef,
        to: cards[1].cardRef,
        curveType: "Quadratic",
        edgeType: 'equation'
      },
      {
        from: cards[1].cardRef,
        to: cards[3].cardRef,
        curveType: "Cubic",
        edgeType: 'equation'
      },
      {
        from: cards[3].cardRef,
        to: cards[4].cardRef,
        curveType: "Quadratic",
        edgeType: 'equation'
      },
      {
        from: cards[4].cardRef,
        to: cards[2].cardRef,
        curveType: "Quadratic",
        edgeType: 'equation'
      },
      {
        from: cards[2].cardRef,
        to: outputRef,
        curveType: "Quadratic",
        edgeType: 'output'
      }
    ];

    return edges;
  }

  useEffect(() => {
    setEdges(prepareEdges());
  }, [cards])

  return (
    <div className="grid grid-cols-12 gap-2 m-16">
      <div className="col-span-2 place-self-center">
        {cards.length > 0 &&
          <IOCard
            cardRef={inputRef}
            value={2}
            type="input" />}
      </div>
      <div
        className="col-span-8 flex items-center justify-center flex-wrap gap-16">
        {cards.map((card, index) => (
          <Card
            key={index}
            cardRef={card.cardRef}
            cardData={{
              equation: card.equation,
              nextFunction: card.nextFunction,
              title: card.title
            }} />
        ))}
        {inputRef.current &&
          edges.length > 0 &&
          edges.map((edge, index) => (
            <ConnectingEdge
              key={index}
              from={edge.from}
              to={edge.to}
              curveType={edge.curveType}
              edgeType={edge.edgeType} />
          ))}
      </div>
      <div
        className="col-span-2 place-self-center">
        {cards.length > 0 &&
          <IOCard
            cardRef={outputRef}
            value={120}
            type="output" />}
      </div>
    </div>
  )
}

export default App;
