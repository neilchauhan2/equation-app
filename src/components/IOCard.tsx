import { IOCardProps } from "../types";

function IOCard({ type, cardRef, handleChange, value }: IOCardProps) {
  if (cardRef) return (
    <div className="mb-16" ref={cardRef}>
      {type === "output" ?
        <span className="inline-flex items-center rounded-2xl bg-green-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20 ">
          Final output y
        </span> :
        <span className="inline-flex items-center rounded-2xl bg-amber-500 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-amber-600/20 ">
          Initial value of x
        </span>}
      <div className={`w-[115px] bg-white mt-1 relative ${type === "output" ? "border-green-500" : "border-amber-500"} border-2 rounded-2xl`}>
        <div className="relative">
          <div className={`absolute flex items-center ${type === "output" ? "left-0 pl-3 " : "right-0 pr-3"}`}>
            <div className={`h-[50px] border-l ${type === "output" ? "border-green-500 ml-6" : "border-amber-500 mr-6"}`}></div>
          </div>
          <input
            type="text"
            value={
              value !== 0 ? value :
                type === "output" ? 0 : ""
            }
            onChange={handleChange}
            className={`w-[115px] h-[50px] bg-transparent text-lg font-bold rounded-2xl focus:outline-none input-point output-point ${type === "output" ? "pl-11 pr-4 py-2" : "pr-11 pl-4 py-2"}`}
          />
        </div>
      </div>
    </div>
  )

  return null;
}

export default IOCard