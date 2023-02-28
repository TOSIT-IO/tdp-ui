export function Toggle({ handleChecked, defaultValue }) {
  return (
    <>
      <label className="relative inline-flex cursor-pointer items-center transition duration-75 ease-in-out hover:bg-slate-200 hover:opacity-70">
        <input
          type="checkbox"
          className="peer sr-only"
          onChange={handleChecked}
          defaultChecked={defaultValue}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200  after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    </>
  )
}
