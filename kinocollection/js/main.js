import { getMovies, saveMovies } from './storage.js';

let movies = [];
let filterText = '';

function renderMovies() {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filteredMovies.length === 0) {
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#777;font-size:1.3rem;">Ничего не найдено</p>`;
    return;
  }

  filteredMovies.forEach(movie => {
    const cardHTML = `
      <div class="card">
        <div class="poster">
          ${movie.poster 
            ? `<img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://picsum.photos/id/1015/300/450'">` 
            : '🎬'}
        </div>
        <div class="card-content">
          <h3>${movie.title}</h3>
          <div class="genre">${movie.genre}</div>
          
          <div class="info">
            <div>
              <small>Дата выхода</small><br>
              <strong>${movie.releaseDate 
                ? new Date(movie.releaseDate).toLocaleDateString('ru-RU') 
                : '<span style="color:#666">не указана</span>'}</strong>
            </div>
            <div class="status">
              <input type="checkbox" ${movie.watched ? 'checked' : ''} data-id="${movie.id}">
              <span>Просмотрено</span>
            </div>
          </div>

          <div style="margin-top: 1.2rem; display: flex; gap: 10px;">
            <button class="btn btn-primary" data-edit="${movie.id}">✏️ Редактировать</button>
            <button class="btn btn-danger" data-delete="${movie.id}">🗑 Удалить</button>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHTML);
  });

  // События
  document.querySelectorAll('input[type="checkbox"]').forEach(ch => {
    ch.addEventListener('change', toggleWatched);
  });

  document.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', deleteMovie);
  });

  document.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', editMovie);
  });
}

function toggleWatched(e) {
  const id = Number(e.target.dataset.id);
  movies = movies.map(movie => {
    if (movie.id === id) movie.watched = e.target.checked;
    return movie;
  });
  saveMovies(movies);
}

function deleteMovie(e) {
  if (!confirm('Удалить этот фильм из коллекции?')) return;
  
  const id = Number(e.target.dataset.delete);
  movies = movies.filter(movie => movie.id !== id);
  saveMovies(movies);
  renderMovies();
}


function editMovie(e) {
  const button = e.target.closest('button');   // ← главное исправление
  
  if (!button || !button.dataset.edit) {
    console.error('Кнопка редактирования не найдена');
    return;
  }

  const id = button.dataset.edit;
  window.location.href = `form.html?id=${id}`;
}
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  movies = getMovies();
  renderMovies();

  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterText = e.target.value;
      renderMovies();
    });
  }
});