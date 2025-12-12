import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import fetchMovies from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";


export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (param: Movie) => {
    setIsOpen(true);
    setSelectedMovie(param);
   };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedMovie(null);
   };

  // function openPop(param: Movie) {
  //   console.log(param.id);
  // }
  
  async function res(par: string) {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);

      const resoult = await fetchMovies(par);
    
      if (resoult.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }
    
      setMovies(resoult);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={css.app}>
      <Toaster />

      <SearchBar onSubmit={res} />
      {isLoading && (<Loader />)}
      {isError && !isLoading && <ErrorMessage />}
      {movies.length > 0 && (<MovieGrid onSelect={openModal} movies={movies} />)}

      {selectedMovie != null && isOpen && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    
    </div>
  );
}

