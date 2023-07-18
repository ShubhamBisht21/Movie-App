import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzE3ZmE4NDUzNjIwMTdkMTM1NmFjYTNjNWJmNTg4ZiIsInN1YiI6IjY0NDc5OWM4ZTE4Yjk3MDQ3NzViMDUwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9aYjAhudJOBJIJmR9TbfwTrTa0Uue8tiR4zzYpqK5w';

const headers = {
    Authorization :'bearer ' + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url,params) => {
    try{
        const {data}  = await axios.get(BASE_URL + url,{
            headers,
            params,
        })
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}