import axios from "axios";
import type { FetchMoviesResponse } from "../types/movie";

export default async function fetchMovies(userQuery: string, page: number): Promise<FetchMoviesResponse> {
    
    const myKey = import.meta.env.VITE_TMDB_TOKEN;

    if (!myKey) throw new Error("VITE_TMDB_TOKEN is missing!");

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
            query: userQuery,
            include_adult: false,
            language: "en-US",
            page

        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${myKey}`
        }
    };
    

    const response = await axios.request<FetchMoviesResponse>(options);
    return response.data;

}

// res => console.log(res.data)