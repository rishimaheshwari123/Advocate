import React, { useEffect, useState } from "react";
import {
  getAllGalleries,
  deleteGallery,
} from "../../../services/operations/gallery";

const GetGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await getAllGalleries();
      setGalleries(data);
      setLoading(false);
    };

    fetchGalleries();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteGallery(id);
    if (result) {
      setGalleries(galleries.filter((gallery) => gallery.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gallery List</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {galleries.length > 0 ? (
                galleries.map((gallery) => (
                  <tr key={gallery.id}>
                    <td className="px-4 py-2 border-b">{gallery._id}</td>
                    <td className="px-4 py-2 border-b">{gallery.title}</td>
                    <td className="px-4 py-2 border-b">{gallery.type}</td>
                    <td className="px-4 py-2 border-b">
                      <img
                        src={gallery?.images?.[0].url}
                        alt={gallery.title}
                        className="w-20 h-20 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => handleDelete(gallery.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 border-b text-center">
                    No galleries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetGallery;
