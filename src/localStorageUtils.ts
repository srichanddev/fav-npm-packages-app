import type { Favorite } from "./types";

export function getFavorites(): Favorite[] {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function saveFavorite(fav: Favorite) {
  const favs = getFavorites();
  favs.push(fav);
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function deleteFavorite(name: string) {
  const favs = getFavorites().filter(f => f.name !== name);
  localStorage.setItem("favorites", JSON.stringify(favs));
}
