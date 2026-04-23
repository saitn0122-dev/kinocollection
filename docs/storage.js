const STORAGE_KEY = 'kinocollection_movies';

export function getMovies() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveMovies(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

export function initDemoData() {
  }
  if (getMovies().length === 0) {
    const demoMovies = [
  {
    id: Date.now() - 100000000,
    title: "Дюна: Часть вторая",
    genre: "Фантастика",
    releaseDate: "2024-03-01",           // ← изменили
    poster: "https://picsum.photos/id/1015/300/450",
    watched: true
  },
  {
    id: Date.now() - 200000000,
    title: "Интерстеллар",
    genre: "Фантастика",
    releaseDate: "2014-11-07",           // ← изменили
    poster: "https://picsum.photos/id/201/300/450",
    watched: true
  },
  {
    id: Date.now() - 300000000,
    title: "Оппенгеймер",
    genre: "Драма",
    releaseDate: "2023-07-21",           // ← изменили
    poster: "https://picsum.photos/id/870/300/450",
    watched: false
  }
  ]
}