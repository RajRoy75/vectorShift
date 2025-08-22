// submit.js

export const SubmitButton = () => {

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <button type="submit">Submit</button> */}
      <button
        type="submit"
        className="
          px-5 py-2 text-2xl font-bold text-white 
          bg-red-500 border-2 border-black rounded-lg 
          shadow-[5px_5px_0px_#000] cursor-pointer 
          transition-all duration-300 ease-in-out
          hover:bg-white hover:text-red-500 hover:border-red-500 hover:shadow-[5px_5px_0px_#ef4444]
          active:bg-yellow-300 active:shadow-none active:translate-y-1
        "
      >
        Submit
      </button>
    </div>
  );
}
