function Card() {
  return (
    <div className="h-[251px] w-[235px] bg-white rounded-xl border border-gray-200 px-5 py-4">
      <span className="text-sm font-semibold text-zinc-400">Function 1</span>
      <div className="mt-3">
        <span className="text-sm">Equation</span>
        <input type="text" className="w-[195px] h-[30px] rounded-lg border border-gray-200 mt-1 text-xs p-2" value="x^2" />
      </div>
      <div className="mt-3">
        <span className="text-sm">Next Function</span>
        <select className="w-[195px] h-[30px] p-1 rounded-lg border border-gray-200 mt-1 text-xs disabled:bg-gray-200 disabled:text-zinc-400" value="Function 2" disabled>
          <option>Select</option>
          <option>Function 2</option>
          <option>Function 3</option>
          <option>Function 4</option>
          <option>Function 5</option>
        </select>
      </div>
      <div className="mt-10 flex justify-between items-center">
        <span className="text-xs">Input</span>
        <span className="text-xs">Output</span>
      </div>
    </div>
  )
}

export default Card