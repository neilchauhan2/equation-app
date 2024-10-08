import { CardProps } from "../types"

function Card({ cardRef, cardData: { equation, nextFunction, title }, handleChange, id }: CardProps) {
  return (
    <div className="h-[251px] w-[235px] bg-white rounded-xl border border-gray-200 px-5 py-4" ref={cardRef}>
      <span className="text-sm font-semibold text-zinc-400">{title}</span>
      <div className="mt-3">
        <span className="text-sm">Equation</span>
        <input type="text" className="w-[195px] h-[30px] rounded-lg border border-gray-200 mt-1 text-xs p-2" value={equation} onChange={
          (e) => handleChange(e, id)
        } />
      </div>
      <div className="mt-3">
        <span className="text-sm">Next Function</span>
        <select className="w-[195px] h-[30px] p-1 rounded-lg border border-gray-200 mt-1 text-xs disabled:bg-gray-200 disabled:text-zinc-400" value={nextFunction} disabled>
          <option value="-">-</option>
          <option value="Function 1">Function 1</option>
          <option value="Function 2">Function 2</option>
          <option value="Function 3">Function 3</option>
          <option value="Function 4">Function 4</option>
          <option value="Function 5">Function 5</option>
        </select>
      </div>
      <div className="mt-10 flex justify-between items-center">
        <span className="text-xs input-point">Input</span>
        <span className="text-xs output-point">Output</span>
      </div>
    </div>
  )
}

export default Card