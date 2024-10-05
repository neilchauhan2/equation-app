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
  const [input, setInput] = useState<number>(0);
  const [output, setOutput] = useState<number>(0);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(Number(e.target.value));
  }

  function handleOutputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOutput(Number(e.target.value));
  }

  function handleEquationChange(e: React.ChangeEvent<HTMLInputElement>, id: string) {
    const { value } = e.target;
    const updatedCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, equation: value };
      }
      return card;
    });

    setCards(updatedCards);
  }

  function equationEvaluator(equation: string, inputSoFar: number): number | string {
    try {
      // Step 1: Replace terms like "10x" with "10*x"
      equation = equation.replace(/(\d+)(x)/g, "$1*$2");

      // Step 2: Replace '^' with '**' for exponentiation
      equation = equation.replace(/\^/g, "**");

      // Step 3: Replace 'x' with the actual input value
      equation = equation.replace(/x/g, `${inputSoFar}`);

      // Step 4: Validation for illegal characters
      if (!/^[\d+\-*/().^* ]+$/.test(equation)) {
        return "Invalid characters in the equation.";
      }

      // Step 5: Check for division by zero
      if (/\/\s*0(?!\d)/.test(equation)) {
        return "Error: Division by zero.";
      }

      // Step 6: Safely evaluate the equation
      const result = eval(equation);

      // Step 7: Return the result
      return result;
    } catch (error) {
      return "Error in evaluation. Please check the equation.";
    }
  }


  function handleComputation(edges: Edge[]) {
    let inputSoFar = input;
    for (let i = 0; i < edges.length; i++) {
      const equation = edges[i].equation;
      if (equation) {
        const result = equationEvaluator(equation, inputSoFar);
        if (typeof result === "number") {
          inputSoFar = result;
        } else {
          return inputSoFar;
        }
      }
    }
    return inputSoFar;
  }

  function prepareCards() {
    const nextFunctionMap: { [key: number]: string } = {
      1: "Function 2",
      2: "Function 4",
      3: "-",
      4: "Function 5",
      5: "Function 3"
    }

    return [...Array(5)].map((_, index) => ({
      id: `equation-${index}`,
      equation: "",
      nextFunction: nextFunctionMap[index + 1],
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
        edgeType: 'input',
        equation: cards[0].equation
      },
      {
        from: cards[0].cardRef,
        to: cards[1].cardRef,
        curveType: "Quadratic",
        edgeType: 'equation',
        equation: cards[1].equation
      },
      {
        from: cards[1].cardRef,
        to: cards[3].cardRef,
        curveType: "Cubic",
        edgeType: 'equation',
        equation: cards[3].equation
      },
      {
        from: cards[3].cardRef,
        to: cards[4].cardRef,
        curveType: "Quadratic",
        edgeType: 'equation',
        equation: cards[4].equation
      },
      {
        from: cards[4].cardRef,
        to: cards[2].cardRef,
        curveType: "Quadratic",
        edgeType: 'equation',
        equation: cards[2].equation
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
    const edges = prepareEdges();
    setEdges(edges);
    const result = handleComputation(edges);
    setOutput(result);
  }, [cards, input])

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
