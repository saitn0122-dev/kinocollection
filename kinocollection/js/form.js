import { getMovies, saveMovies } from './storage.js';

let editingId = null;

function loadEditingMovie() {
  const urlParams = new URLSearchParams(window.location.search);
  editingId = urlParams.get('id');

  if (editingId) {
    document.getElementById('page-title').textContent = 'Редактировать фильм';
    
    const movies = getMovies();
    const movie = movies.find(m => m.id == editingId);   // важно: == (не ===)

    if (movie) {
      document.getElementById('title').value     = movie.title || '';
      document.getElementById('genre').value     = movie.genre || '';
      document.getElementById('releaseDate').value = movie.releaseDate || '';   // ← главное исправление
      document.getElementById('poster').value    = movie.poster || '';
    } else {
      console.error('Фильм с id=' + editingId + ' не найден');
    }
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const title       = document.getElementById('title').value.trim();
  const genre       = document.getElementById('genre').value.trim();
  const releaseDate = document.getElementById('releaseDate').value;
  const poster      = document.getElementById('poster').value.trim();

  if (!title) {
    alert('Введите название фильма!');
    return;
  }

  let allMovies = getMovies();

  if (editingId) {
    allMovies = allMovies.map(movie => {
      if (movie.id == editingId) {
        return { 
          ...movie, 
          title, 
          genre: genre || 'Без жанра', 
          releaseDate: releaseDate || null, 
          poster: poster || '' 
        };
      }
      return movie;
    });
    alert('Фильм успешно обновлён!');
  } else {
    // Добавление нового
    const newMovie = {
      id: Date.now(),
      title: title,
      genre: genre || 'Без жанра',
      releaseDate: releaseDate || null,
      poster: poster || '',
      watched: false
    };
    allMovies.push(newMovie);
    alert('✅ Фильм успешно добавлен в коллекцию!');
  }

  saveMovies(allMovies);
  window.location.href = 'index.html';
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
  loadEditingMovie();
  
  const form = document.getElementById('movie-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  } else {
    console.error('Форма не найдена!');
  }
});