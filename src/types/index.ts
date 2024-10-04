export type CardType = {
  id: string;
  equation: string;
  nextFunction: string;
  title: string;
  cardRef: React.RefObject<HTMLDivElement>;
};

export type Edge = {
  from: React.RefObject<HTMLDivElement>;
  to: React.RefObject<HTMLDivElement>;
  curveType: "Quadratic" | "Cubic";
  edgeType: "input" | "output" | "equation";
};

export type CardData = {
  equation: string;
  nextFunction: string;
  title: string;
};

export type CardProps = {
  cardRef: React.RefObject<HTMLDivElement>;
  cardData: CardData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  id: string;
};

export type IOCardProps = {
  cardRef: React.RefObject<HTMLDivElement>;
  value: number | null;
  type: "input" | "output";
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
