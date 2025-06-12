import { useEffect, useState } from "react"

export default function AdminCourses() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    // Simulated fetch call
    setCourses([
      {
        id: 1,
        title: "React Basics",
        instructor: "John Doe",
        enrolled: 120,
        rating: 4.5,
      },
      {
        id: 2,
        title: "Advanced Node.js",
        instructor: "Jane Smith",
        enrolled: 75,
        rating: 4.7,
      },
      {
        id: 3,
        title: "MongoDB for Beginners",
        instructor: "Ali Khan",
        enrolled: 98,
        rating: 4.3,
      },
    ])
  }, [])

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  )

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
              <th className="px-4 py-2 border-b border-richblack-700">Course Title</th>
              <th className="px-4 py-2 border-b border-richblack-700">Instructor</th>
              <th className="px-4 py-2 border-b border-richblack-700">Enrolled</th>
              <th className="px-4 py-2 border-b border-richblack-700">Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} className="bg-richblack-800">
                <td className="px-4 py-2 border-b border-richblack-700">{course.title}</td>
                <td className="px-4 py-2 border-b border-richblack-700">{course.instructor}</td>
                <td className="px-4 py-2 border-b border-richblack-700">{course.enrolled}</td>
                <td className="px-4 py-2 border-b border-richblack-700">{course.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
