const search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className="search flex" > 
        {/* <FaSearch size={20} color="gold" /> */}
      <input type="text" className=" bg-amber-50 w-3" placeholder="Search your movie here:" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}></input>
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
