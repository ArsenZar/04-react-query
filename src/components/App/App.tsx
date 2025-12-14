import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import fetchMovies from "../../services/movieService";
import { useState, useEffect } from "react";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from "react-paginate";


export default function App() {

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  


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
  
  function res(par: string) {
    if (par.trim() === '') {
      toast.error("Enter film name");
      return;
    };
    setQuery(par);
    setPage(1);
  }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],  // змінюємо ключ запиту залежно від count
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev
  });

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (isSuccess && movies.length === 0) {
      toast("No movies found");
    }
  }, [isSuccess, movies.length]);
  
  return (
    <div className={css.app}>
      <Toaster />

      <SearchBar onSubmit={res} />
      {isLoading && (<Loader />)}
      {isError && <ErrorMessage />}
      {movies.length > 0 && totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => setPage(selected + 1)}
        forcePage={page - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"

      />}
      {movies.length > 0 && (<MovieGrid onSelect={openModal} movies={movies} />)}
      

      {selectedMovie != null && isOpen && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    
    </div>
  );
}

