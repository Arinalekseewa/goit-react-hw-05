import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
//import styles from "./App.module.css";
import Navigation from "../Navigation/Navigation";
import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
//import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";

const ACCESS_KEY = 'ac74d9accbc3c599abd4da847d5ed257';
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzc0ZDlhY2NiYzNjNTk5YWJkNGRhODQ3ZDVlZDI1NyIsIm5iZiI6MTc0OTAyOTk5OS4zMzksInN1YiI6IjY4NDAxNDZmZDc2NDA2M2Y1MmFkOGE5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7JCxN7Du0QQFCsUknFB0MAfCRkizbanpuIrLtYpX6Bc'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export default function App() {
  return (
    <>
      <div>
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie" element={<MoviesPage />}/>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div> 
    </>
  )
};