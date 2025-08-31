const search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search flex gap-2 bg-white" > 
        {/* <FaSearch size={20} color="gold" /> */}
      <input type="text" className=" bg-blue-950 font-bold text-white text-center rounded-l w-full" placeholder="Search your movie here:" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}></input>
     <button
        onClick={() => setSearchTerm('')}
        className="text-white bg-gray-100 h-fit w-6 rounded-2xl my-3"
      >
        ×
      </button>
    </div>
  )
}

export default search
