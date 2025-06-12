import React, { useState } from 'react';

const dummyCourses = [
  {
    id: 1,
    name: 'React for Beginners',
    reviews: [
      { id: 101, user: 'Alice', rating: 5, comment: 'Excellent course!' },
      { id: 102, user: 'Bob', rating: 4, comment: 'Very helpful content.' },
    ],
  },
  {
    id: 2,
    name: 'Advanced Node.js',
    reviews: [
      { id: 201, user: 'Charlie', rating: 5, comment: 'Best backend course ever!' },
      { id: 202, user: 'Dana', rating: 3, comment: 'Good but complex examples.' },
    ],
  },
];

export default function Reviews() {
  const [openCourse, setOpenCourse] = useState(null);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Course Reviews</h1>
      <div className="grid gap-6">
        {dummyCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
          >
            <div
              className="rounded-2xl flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded-t-2xl"
              onClick={() => setOpenCourse(openCourse === course.id ? null : course.id)}
            >
              <h2 className="text-xl font-semibold text-gray-700">{course.name}</h2>
              <span className="text-sm text-blue-500">
                {openCourse === course.id ? 'Hide Reviews ▲' : 'Show Reviews ▼'}
              </span>
            </div>
            {openCourse === course.id && (
              <div className="px-6 pb-6 bg-gray-50 rounded-b-2xl">
                <ul className="divide-y divide-gray-200">
                  {course.reviews.map((review) => (
                    <li key={review.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-md font-medium text-gray-700">{review.user}</p>
                          <p className="text-sm text-gray-500 italic">"{review.comment}"</p>
                        </div>
                        <span className="text-yellow-500 font-bold text-lg">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
