import { useEffect, useRef, useState } from "react";
import Card from "./components/Card"
import ConnectingEdge from "./components/ConnectingEdge";
import IOCard from "./components/IOCard";
import { CardType, Edge } from "./types";

function App() {
  const [edges, setEdges] = useState<Edge[]>([]);
  const [cards, setCards] = useState<CardType[]>(prepareCards());
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<number | null>(null);
  const [output, setOutput] = useState<number | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(Number(e.target.value));
  }

  function handleOutputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOutput(Number(e.target.value));
  }

  function handleEquationChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    const { value } = e.target;
    const card = cards.find(card => card.id === id);
    if (card) {
      card.equation = value;
      setCards([...cards]);
    }
  }

  function prepareCards() {
    return [...Array(5)].map((_, index) => ({
      id: `equation-${index}`,
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
            value={input}
            type="input"
            handleChange={handleInputChange}
          />
        }
      </div>
      <div
        className="col-span-8 flex items-center justify-center flex-wrap gap-16">
        {cards.map((card) => (
          <Card
            key={card.id}
            cardRef={card.cardRef}
            cardData={{
              equation: card.equation,
              nextFunction: card.nextFunction,
              title: card.title
            }}
            handleChange={handleEquationChange}
            id={card.id}
          />
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
            value={output}
            type="output"
            handleChange={handleOutputChange}
          />}
      </div>
    </div>
  )
}

export default App;
