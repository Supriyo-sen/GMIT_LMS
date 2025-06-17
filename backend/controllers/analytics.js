const Course = require('../models/course');
const Payment = require('../models/payment');
const RatingAndReview = require('../models/ratingAndReview');

// @desc    Get dashboard analytics
// @route   GET /api/v1/analytics/dashboard
// @access  Private/Admin
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalEnrollmentsResult = await Course.aggregate([
      { $unwind: "$studentsEnrolled" },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    const totalEnrollments = totalEnrollmentsResult[0]?.count || 0;

    const revenueResult = await Payment.aggregate([
      { $match: { status: "SUCCESS" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueResult[0]?.total ? revenueResult[0].total / 100 : 0;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const currentMonthRevenueResult = await Payment.aggregate([
      {
        $match: {
          status: "SUCCESS",
          date: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);
    const currentMonthRevenue = currentMonthRevenueResult[0]?.total
      ? currentMonthRevenueResult[0].total / 100
      : 0;

    const activeCourses = await Course.countDocuments({
      studentsEnrolled: { $exists: true, $not: { $size: 0 } }
    });

    const pendingReviews = await RatingAndReview.countDocuments({
      status: { $exists: false }
    });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const revenueTrend = await Payment.aggregate([
      {
        $match: {
          status: "SUCCESS",
          date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 6 }
    ]);

    const topCourses = await Course.aggregate([
      {
        $project: {
          courseName: 1,
          studentsEnrolled: { $size: "$studentsEnrolled" },
          thumbnail: 1
        }
      },
      { $sort: { studentsEnrolled: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEnrollments,
        totalRevenue,
        currentMonthRevenue,
        activeCourses,
        pendingReviews,
        topCourses,
        revenueTrend,
        currency: "INR"
      }
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message
    });
  }
};


// @desc    Get course analytics
// @route   GET /api/v1/analytics/courses
// @access  Private/Admin
exports.getCourseAnalytics = async (req, res) => {
    try {
      const result = await Course.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category"
          }
        },
        { $unwind: "$category" },
        {
          $group: {
            _id: "$category.name",
            courseCount: { $sum: 1 },
            studentCount: { $sum: { $size: "$studentsEnrolled" } } // ✅ count students
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id",
            courseCount: 1,
            studentCount: 1,
            value: "$courseCount" // for pie chart compatibility
          }
        },
        { $sort: { value: -1 } }
      ]);
  
      res.status(200).json({
        success: true,
        data: result
      });
  
    } catch (error) {
      console.error("Error fetching course analytics:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch course analytics",
        error: error.message
      });
    }
  };
  
  

// @desc    Get earnings per instructor
// @route   GET /api/v1/analytics/instructor-income
// @access  Private/Admin
exports.getInstructorEarnings = async (req, res) => {
  try {
    const result = await Payment.aggregate([
      { $match: { status: "SUCCESS" } },

      // Join with Course to get instructor
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "courseInfo"
        }
      },
      { $unwind: "$courseInfo" },

      // Group by instructor and calculate total income
      {
        $group: {
          _id: "$courseInfo.instructor",
          totalIncome: { $sum: "$amount" },
          totalSales: { $sum: 1 }
        }
      },

      // Join with User to get instructor details
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "instructor"
        }
      },
      { $unwind: "$instructor" },

      // Final shape
      {
        $project: {
          _id: 0,
          instructorId: "$instructor._id",
          name: { $concat: ["$instructor.firstName", " ", "$instructor.lastName"] },
          email: "$instructor.email",
          totalIncome: { $divide: ["$totalIncome", 100] }, // Convert from paisa to INR
          totalSales: 1
        }
      },
      { $sort: { totalIncome: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Error fetching instructor earnings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor earnings",
      error: error.message
    });
  }
};
