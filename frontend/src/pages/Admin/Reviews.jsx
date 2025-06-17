import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { getAllReviews } from '../../services/operations/courseDetailsAPI';

export default function Reviews() {
  const { token } = useSelector((state) => state.auth);
  const [openCourse, setOpenCourse] = useState(null);
  const [reviewsByCourse, setReviewsByCourse] = useState({});
  const fetchReviews = async () => {
    const data = await getAllReviews({}, token);
    if (!data || !Array.isArray(data)) {
      toast.error("No reviews data found");
      return;
    }
  
    // Group reviews by course ID
    const grouped = data.reduce((acc, review) => {
      const courseId = review.course?._id || "unknown";
      const courseName = review.course?.courseName || "Unknown Course";
      if (!acc[courseId]) {
        acc[courseId] = { name: courseName, reviews: [] };
      }
      acc[courseId].reviews.push({
        ...review,
        rating: Number(review.rating)
      });
      return acc;
    }, {});
  
    setReviewsByCourse(grouped);
  };
  

  useEffect(() => {
    if (token) {
      fetchReviews();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Course Reviews</h1>
      <div className="grid gap-6">
        {Object.entries(reviewsByCourse).map(([courseId, course]) => (
          <div
            key={courseId}
            className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all"
          >
            <div
              className="rounded-2xl flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-blue-100 via-white to-purple-100 rounded-t-2xl"
              onClick={() => setOpenCourse(openCourse === courseId ? null : courseId)}
            >
              <h2 className="text-xl font-semibold text-gray-700">{course.name}</h2>
              <span className="text-sm text-blue-500">
                {openCourse === courseId ? 'Hide Reviews ▲' : 'Show Reviews ▼'}
              </span>
            </div>
            {openCourse === courseId && (
              <div className="px-6 pb-6 bg-gray-50 rounded-b-2xl">
                <ul className="divide-y divide-gray-200">
                  {course.reviews.map((review) => (
                    <li key={review._id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-md font-medium text-gray-700">{review?.user?.firstName || "Anonymous"}</p>
                          <p className="text-sm text-gray-500 italic">"{review.review}"</p>
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
