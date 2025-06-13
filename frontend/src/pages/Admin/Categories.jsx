import { useState } from "react";
import { createCategory } from "../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Category() {
  const { token } = useSelector((state) => state.auth);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createCategory(category, token);
      console.log("CREATE_CATEGORY_API API RESPONSE............", response);
      if (response.success) {
        toast.success(response.message);
        setCategories((prev) => [...prev, response.data]);
        setCategory({ name: "", description: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-3xl font-semibold mb-8 border-b pb-4">
        Manage Course Categories
      </h1>

      {/* ========== CREATE CATEGORY SECTION ========== */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">➕ Create New Category</h2>
        <form
          className="bg-gray-100 p-6 rounded shadow-sm space-y-4 max-w-xl"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Development"
              name="name"
              value={category.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Describe this category..."
              name="description"
              value={category.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded resize-none h-24 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Create Category
          </button>
        </form>
      </section>

      {/* ========== SHOW ALL CATEGORIES ========== */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">📋 All Categories</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-50 p-4 border border-gray-200 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedCategoryId(`category-${idx + 1}`)}
            >
              <h3 className="font-semibold text-lg">Category {idx + 1}</h3>
              <p className="text-sm text-gray-600 mt-1">
                This is a short description of category {idx + 1}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CATEGORY PAGE DETAILS ========== */}
      <section>
        <h2 className="text-xl font-bold mb-4">📂 Category Page Details</h2>

        {selectedCategoryId ? (
          <div className="bg-blue-50 p-6 border border-blue-200 rounded shadow-sm space-y-3">
            <h3 className="text-lg font-semibold">
              Selected Category:{" "}
              <span className="text-blue-800">{selectedCategoryId}</span>
            </h3>
            <p>
              <strong>Published Courses:</strong> 5
            </p>
            <p>
              <strong>Top-Selling Courses:</strong> Fullstack Bootcamp, React
              Mastery
            </p>
            <p>
              <strong>Other Popular Category:</strong> Data Science
            </p>
          </div>
        ) : (
          <p className="text-gray-500">
            Select a category from the list above to view details.
          </p>
        )}
      </section>
    </div>
  );
}
