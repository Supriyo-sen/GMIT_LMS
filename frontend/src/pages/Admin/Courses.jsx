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
      console.log("GET_ALL_COURSE_API API RESPONSE............", response);
      if (response) {
        setCourses(response);
      }
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

  console.log("Filtered Courses:", filteredCourses);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">All Courses</h2>

      <input
        type="text"
        placeholder="Search by course title..."
        className="mb-4 p-2 rounded-md w-full md:w-1/3 border border-richblack-700 bg-richblack-800 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-white text-left">
          <thead className="bg-richblack-800 text-richblack-100">
            <tr>
              <th className="px-4 py-2 border-b border-richblack-700">
                Course Title
              </th>
              <th className="px-4 py-2 border-b border-richblack-700">
                Instructor
              </th>
              <th className="px-4 py-2 border-b border-richblack-700">
                Enrolled
              </th>
              <th className="px-4 py-2 border-b border-richblack-700">
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course._id} className="bg-richblack-800">
                <td className="px-4 py-2 border-b border-richblack-700">
                  {course.courseName}
                </td>
                <td className="px-4 py-2 border-b border-richblack-700">
                  {course.instructor.firstName}
                </td>
                <td className="px-4 py-2 border-b border-richblack-700">
                  {course.enrolled ? course.enrolled.length : 0}
                </td>
                <td className="px-4 py-2 border-b border-richblack-700">
                  {course.rating ? course.rating.toFixed(1) : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
