

import { useEffect, useState } from 'react';
import Loader from './components/Loader.jsx';
import MovieCard from './components/movieCard.jsx';
import Search from './components/search.jsx';


const App = () => {
  const API_BASE_URL='https://api.themoviedb.org/3';
  const API_KEY=import.meta.env.VITE_TMDB_API_KEY;
  const API_OPTIONS={
    method:'GET',
    headers:{
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const [error,setError]=useState('');
  const [searchTerm,setSearchTerm]=useState('');
 
  const [movieList,setMovieList]=useState([]);
  const [isLoading,setIsLoading]=useState();
  const [selectedCard,setSelectedCard]=useState();

  const fetchMovies=async(query='')=>{
    try{
      setIsLoading('true');
      setError('');
const endpoint=query?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
:`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
const response=await fetch(endpoint,API_OPTIONS);

if(!response.ok){
  throw new Error('Failed to fetch movies');
  
}
const data = await response.json();
console.log(data);
setMovieList(data.results || []);
    }
    catch(error){
      setError('Error fetching movies. Please try again later');
    }
    finally{
    setIsLoading(false);
  }
  }
  
  useEffect(()=>{
fetchMovies(searchTerm);
    },[searchTerm]);

  return (
    <>



    <div className="wrapper">
      <img src="hero.png" alt="hero image" className="size-1/2 mx-auto"></img>
      <h1>
      Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle
      </h1>
    </div>
    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>


<section className="all-movies">
<h2 className='relative left-1/12 top-2'>ALL MOVIES</h2>
{isLoading ? (<Loader></Loader>) : error ? (<p className='text-red-500'> Error Fetching Movies</p>): 
<ul>
  {movieList.map((movie)=>(
    <MovieCard key={movie.id}  movie={movie} onClick={()=>setSelectedCard(movie)}></MovieCard>
  ))}
</ul> }
</section>

{selectedCard && (
  <div className="fixed inset-0 bg-black/90  flex items-center justify-center z-50" onClick={() => setSelectedCard(null)}>
    <div className="bg-white rounded-lg max-w-2xl p-6 relative">
      <button
        onClick={() => setSelectedCard(null)}
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
      >
        ×
      </button>
      <div className='flex items-center justify-evenly'>
      <img className="size-1/3 rounded-full" src={selectedCard.poster_path ?   `https://image.tmdb.org/t/p/w500/${selectedCard.poster_path}`: '/no-movie.png'}/>
      
      <h2 className="text-black text-2xl font-bold mb-2">{selectedCard.title}</h2>
      </div>
      <p className="mb-4 text-gray-700">{selectedCard.overview}</p>
      <p className="text-sm text-gray-500">
        Release Date: {selectedCard.release_date}
      </p>
      <p className="text-sm text-gray-500">
        Rating: {selectedCard.vote_average} / 10
      </p>
    </div>
  </div>
)}
    
    </>
  )
}

export default App
