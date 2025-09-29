import React, { useState, useEffect } from "react";
import { getFavorites, deleteFavorite, saveFavorite } from "../localStorageUtils";
import type { Favorite } from "../types";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

// Inline SVG icons
const EyeIcon = () => (
  <svg className="w-6 h-6 inline-block mr-3 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const EditIcon = () => (
  <svg className="w-6 h-6 inline-block mr-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l10-10a2.828 2.828 0 0 0-4-4l-10 10v6z"/>
  </svg>
);
const TrashIcon = () => (
  <svg className="w-6 h-6 inline-block text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6v12a2 2 0 0 0 4 0V6m6 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6m5-3h4a1 1 0 0 1 1 1V6m-7-2a1 1 0 0 1 1-1h4"/>
  </svg>
);

export default function FavoritesPage() {
  const [favs, setFavs] = useState<Favorite[]>(() => getFavorites());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [viewFav, setViewFav] = useState<Favorite | null>(null);
  const [editFav, setEditFav] = useState<Favorite | null>(null);
  const [editReason, setEditReason] = useState("");

  useEffect(() => {
    setFavs(getFavorites());
  }, []);

  const askDelete = (name: string) => { setToDelete(name); setIsModalOpen(true); };
  const confirmDelete = () => {
    if (toDelete) {
      deleteFavorite(toDelete);
      setFavs(getFavorites());
      setToDelete(null);
      setIsModalOpen(false);
    }
  };
  const openView = (fav: Favorite) => setViewFav(fav);
  const closeView = () => setViewFav(null);
  const openEdit = (fav: Favorite) => { setEditFav(fav); setEditReason(fav.reason);}
  const closeEdit = () => { setEditFav(null); setEditReason(""); }
  const saveEdit = () => {
    if (editFav) {
      deleteFavorite(editFav.name);
      saveFavorite({ name: editFav.name, reason: editReason });
      setFavs(getFavorites());
      closeEdit();
    }
  };

  // If the list is empty then this card will shown
  if (favs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto pt-16">
          <div className="text-lg font-semibold mb-8 ml-2">Welcome to Favorite NPM Packages</div>
          <div className="border rounded bg-white mx-auto" style={{ maxWidth: 600 }}>
            <div className="flex flex-col items-center justify-center py-20">
              <p className="mb-7">You don’t have any favs yet. Please add.</p>
              <Link to="/">
                <Button className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700">
                  Add Fav
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main table page
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto pt-12">
        <div className="flex justify-between items-center mb-5">
          <div className="text-2xl font-semibold">Welcome to Favorite NPM Packages</div>
          <Link to="/">
            <Button className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700">
              Add Fav
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded border shadow-md">
          <table className="w-full border-separate border-spacing-0 text-lg" style={{ borderCollapse: "separate" }}>
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-6 py-4 text-left font-bold bg-gray-50">Package Name</th>
                <th className="border-b border-gray-200 px-6 py-4 text-left font-bold bg-gray-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favs.map(fav => (
                <tr key={fav.name} className="border-b border-gray-200">
                  <td className="px-6 py-4">{fav.name}</td>
                  <td className="px-6 py-4 flex gap-0 items-center">
                    <button title="View" className="hover:text-blue-600" onClick={() => openView(fav)}>
                      <EyeIcon />
                    </button>
                    <button title="Edit" className="hover:text-yellow-500" onClick={() => openEdit(fav)}>
                      <EditIcon />
                    </button>
                    <button title="Delete" className="hover:text-red-500 ml-8" onClick={() => askDelete(fav.name)}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
        <Modal
          isOpen={isModalOpen}
          message="Are you sure you want to delete?"
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
        {viewFav && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow min-w-[320px]">
              <h2 className="text-lg font-semibold mb-4">View Favorite</h2>
              <div className="mb-2"><strong>Package Name:</strong> {viewFav.name}</div>
              <div className="mb-6"><strong>Why:</strong> {viewFav.reason}</div>
              <Button onClick={closeView}>Close</Button>
            </div>
          </div>
        )}
        {editFav && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow min-w-[320px]">
              <h2 className="text-lg font-semibold mb-4">Edit Favorite</h2>
              <div className="mb-2"><strong>Package Name:</strong> {editFav.name}</div>
              <div className="mb-4">
                <strong>Why:</strong>
                <textarea
                  value={editReason}
                  onChange={e => setEditReason(e.target.value)}
                  className="border rounded px-2 py-1 w-full mt-2"/>
              </div>
              <div className="flex space-x-4">
                <Button onClick={closeEdit} className="bg-red-500 hover:bg-red-600">Cancel</Button>
                <Button onClick={saveEdit} className="bg-green-500 hover:bg-green-600">Save</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
