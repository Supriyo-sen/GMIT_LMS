import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategoryAPI,
  fetchCourseCategories,
  getCategoryPageDetails,
} from "../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Category() {
  const { token } = useSelector((state) => state.auth);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryPageWise, setCategoryPageWise] = useState(null);
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await fetchCourseCategories({}, token);
      console.log("FETCH_CATEGORIES_API API RESPONSE............", response);
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const fetchCategoryPageDetails = async (categoryId) => {
    try {
      const response = await getCategoryPageDetails({ categoryId }, token);
      console.log("FETCH_CATEGORY_PAGE_DETAILS RESPONSE............", response);
      setCategoryPageWise(response);
    } catch (error) {
      console.error("Error fetching category details:", error);
      toast.error("Failed to fetch category details");
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await deleteCategory({ categoryId }, token);
      console.log("DELETE_CATEGORY_API API RESPONSE............", response);
      if (response) {
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      if (response) {
        setCategory(() => ({ name: "", description: "" }));
        fetchCategories();
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    toast(
      (t) => (
        <span className="flex flex-col space-y-2">
          <p className="text-sm text-gray-800">
            Are you sure you want to delete this category?
          </p>
          <div className="flex gap-3">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                const response = await deleteCategoryAPI(categoryId, token);
                if (response) fetchCategories();
              }}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      {
        duration: 6000,
      }
    );
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
          {categories.map((item, idx) => (
            <div className="flex items-center justify-between bg-gray-50 p-4 border border-gray-200 rounded shadow cursor-pointer hover:bg-gray-100">
            <div
              key={item._id}
              className=""
              onClick={() => {
                setSelectedCategoryId(item._id);
                fetchCategoryPageDetails(item._id);
              }}
            >
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              
            </div>
            <button
            onClick={() => handleDeleteCategory(item._id)}
            className=""
          ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer transition duration-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        
          </button>
          </div>
          ))}
        </div>
      </section>

      {/* ========== CATEGORY PAGE DETAILS ========== */}
      <section>
        <h2 className="text-xl font-bold mb-4">📂 Category Page Details</h2>

        {categoryPageWise ? (
          <div className="bg-blue-50 p-6 border border-blue-200 rounded shadow-sm space-y-3">
            <h3 className="text-lg font-semibold">
              Selected Category:{" "}
              <span className="text-blue-800">
                {categoryPageWise.selectedCategory.name}
              </span>
            </h3>
            <p>
              <strong>Published Courses:</strong>{" "}
              {categoryPageWise.selectedCategory.courses.length}
            </p>
            <p>
              <strong>Top-Selling Courses:</strong>{" "}
              {categoryPageWise.mostSellingCourses
                .slice(0, 2)
                .map((course) => course.courseName)
                .join(", ")}
            </p>
            <p>
              <strong>Other Popular Category:</strong>{" "}
              {categoryPageWise.differentCategory?.name}
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
