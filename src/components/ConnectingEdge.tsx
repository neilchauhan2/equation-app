import { useEffect, useState } from "react";

type ConnectingEdgeProps = {
  from: React.RefObject<HTMLDivElement>
  to: React.RefObject<HTMLDivElement>
  curveType: "Quadratic" | "Cubic"
}

type Point = {
  fromX: number
  fromY: number
  toX: number
  toY: number
  midX: number
  midY: number
}

const ConnectingEdge = ({ from, to, curveType = "Quadratic" }: ConnectingEdgeProps) => {
  if (!from || !to) return null;
  const [path, setPath] = useState("");
  const [startPoint, setStartPoint] = useState<{ x: number, y: number } | null>(null);
  const [endPoint, setEndPoint] = useState<{ x: number, y: number } | null>(null);


  function getPoints(fromElement: DOMRect, toElement: DOMRect): Point {
    const fromX = fromElement.x + fromElement.width;
    const fromY = fromElement.y + fromElement.height / 2;
    const toX = toElement.x;
    const toY = toElement.y + toElement.height / 2;

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;

    return { fromX, fromY, toX, toY, midX, midY };
  }

  useEffect(() => {
    const fromElement = from?.current?.querySelector('.output-point')?.getBoundingClientRect();
    const toElement = to?.current?.querySelector('.input-point')?.getBoundingClientRect();

    if (fromElement && toElement) {
      const { fromX, fromY, toX, toY, midX, midY } = getPoints(fromElement, toElement);

      if (curveType === "Quadratic") {
        const pathData = `
        M ${fromX - 50} ${fromY} 
        Q ${midX} ${midY + 80}, ${toX - 10} ${toY}
      `;

        setStartPoint({ x: fromX - 50, y: fromY });
        setEndPoint({ x: toX - 10, y: toY });

        setPath(pathData);
      } else if (curveType === "Cubic") {
        const pathData = `
          M ${fromX - 50} ${fromY} 
          C ${midX} ${fromY}, ${midX} ${toY}, ${toX - 10} ${toY}
        `;

        setStartPoint({ x: fromX - 50, y: fromY });
        setEndPoint({ x: toX - 10, y: toY });

        setPath(pathData);
      }
    }
  }, [from, to]);




  return (
    <svg className="absolute top-0 left-0 pointer-events-none w-full h-full">
      <path d={path} stroke="#0066FF4F" strokeWidth="7" fill="none" />
      <circle
        cx={startPoint?.x}
        cy={startPoint?.y}
        r="4"
        fill="#66A3FF"
        className="start-point"
      />
      <circle
        cx={startPoint?.x}
        cy={startPoint?.y}
        r="7"
        fill="transparent"
        stroke="#BDBDBD"
        strokeWidth="2"
        className="start-point-ring"
      />

      <circle
        cx={endPoint?.x}
        cy={endPoint?.y}
        r="7"
        fill="transparent"
        stroke="#BDBDBD"
        strokeWidth="2"
        className="start-point-ring"
      />
      <circle
        cx={endPoint?.x}
        cy={endPoint?.y}
        r="4"
        fill="#66A3FF"
        className="end-point"
      />
    </svg >
  );
};

export default ConnectingEdge;