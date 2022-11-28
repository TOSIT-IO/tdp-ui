export function Toggle({ handleChecked, defaultValue }) {
  return (
    <>
      <label className="inline-flex relative items-center cursor-pointer hover:opacity-70 hover:bg-slate-200 transition duration-75 ease-in-out">
        <input
          type="checkbox"
          className="sr-only peer"
          onChange={handleChecked}
          defaultChecked={defaultValue}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
      </label>
    </>
  )
}
