import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../services/operations/courseDetailsAPI";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");

  const fetchAllCourses = async (token) => {
    try {
      const response = await getAllCourses(token);
      if (response) setCourses(response);
    } catch (error) {
      console.error("Could not fetch courses:", error);
    }
  };

  useEffect(() => {
    fetchAllCourses(token);
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(search.toLowerCase())
  );
console.log("Filtered Courses:", courses);

  return (
    <div className="p-6 min-h-screen  text-gray-800">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Courses</h2>
        <input
          type="text"
          placeholder="Search by course title..."
          className="mt-4 md:mt-0 p-2 rounded-md md:w-1/3 border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow border border-gray-300 bg-white">
        {filteredCourses.length > 0 ? (
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="px-6 py-4 text-left border-b border-gray-300">📚 Course Title</th>
                <th className="px-6 py-4 text-left border-b border-gray-300">👨‍🏫 Instructor</th>
                <th className="px-6 py-4 text-left border-b border-gray-300">👥 Enrolled</th>
                <th className="px-6 py-4 text-left border-b border-gray-300">⭐ Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr
                  key={course._id}
                  className={`transition duration-300 hover:bg-blue-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-3 border-b border-gray-200">{course.courseName}</td>
                  <td className="px-6 py-3 border-b border-gray-200">
                    {course.instructor?.firstName || "N/A"}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200">
                    {course.studentsEnrolled?.length || 0}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200">
  {course.ratingAndReviews && course.ratingAndReviews.length > 0 ? (
    (() => {
      const maxRating = Math.max(
        ...course.ratingAndReviews.map((r) => Number(r.rating))
      );
      const fullStars = Math.floor(maxRating);
      const emptyStars = 5 - fullStars;

      return (
        <div
          className="flex items-center gap-1 text-yellow-400"
          title={`${maxRating} out of 5`}
        >
          {Array(fullStars)
            .fill()
            .map((_, i) => (
              <svg
                key={`full-${i}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.774 1.572 8.26L12 18.896 4.492 23.34l1.572-8.26L0 9.306l8.332-1.151z" />
              </svg>
            ))}
          {Array(emptyStars)
            .fill()
            .map((_, i) => (
              <svg
                key={`empty-${i}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-5 h-5 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.774 1.572 8.26L12 18.896 4.492 23.34l1.572-8.26L0 9.306l8.332-1.151z"
                />
              </svg>
            ))}
        </div>
      );
    })()
  ) : (
    <span className="text-gray-400 italic">No ratings</span>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No courses found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
