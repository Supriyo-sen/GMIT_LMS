import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { analyticsEndpoints } from "../apis";

const {
  COURSE_ANALYTICS_API,
  DASHBOARD_ANALYTICS_API,
  INSTRUCTOR_EARNINGS_API
} = analyticsEndpoints;

// ================ get Dashboard Analytics ================
export const getDashboardAnalytics = async (token, dispatch) => {
  const toastId = toast.loading("Fetching Dashboard Data...");
  let result = [];
  try {
    dispatch(setLoading(true));
    const response = await apiConnector(
      "GET",
      DASHBOARD_ANALYTICS_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response.data?.message || "Could not fetch dashboard analytics");
    }

    const data = response.data.data;
    console.log("GET_DASHBOARD_ANALYTICS_API RESPONSE............", data);

    // Main dashboard metrics
    result = [
      {
        title: "Total Enrollments",
        value: data.totalEnrollments || 0,
        icon: "🎓",
        description: "Total students enrolled across all courses.",
      },
      {
        title: "Revenue",
        value: `₹ ${data.totalRevenue?.toLocaleString('en-IN') || 0}`,
        icon: "💰",
        description: "Total revenue generated.",
      },
      {
        title: "Active Courses",
        value: data.activeCourses || 0,
        icon: "📘",
        description: "Courses currently live and accepting enrollments.",
      },
      {
        title: "Pending Reviews",
        value: data.pendingReviews || 0,
        icon: "📝",
        description: "Reviews awaiting moderation.",
      },
    ];

    // Format revenue chart
    const revenueData = data.revenueTrend?.map(item => ({
      month: new Date(0, item._id.month - 1).toLocaleString('default', { month: 'short' }),
      revenue: item.total / 100, // convert from paisa to ₹
    })) || [];

    return { data: result, trendData: revenueData };

  } catch (error) {
    console.error("DASHBOARD ANALYTICS API ERROR............", error);
    toast.error(error.message || "Failed to fetch dashboard analytics");
    throw error;
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};



// ================ get Course Analytics ================
export const getCourseAnalytics = async (courseId, token, dispatch) => {
  const toastId = toast.loading("Fetching Course Analytics...");
  let result = [];
  try {
    dispatch?.(setLoading(true));

    const response = await apiConnector(
      "GET",
      courseId ? `${COURSE_ANALYTICS_API}/${courseId}` : COURSE_ANALYTICS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response.data?.message || "Could not fetch course analytics");
    }

    const raw = response.data.data;
    console.log("GET_COURSE_ANALYTICS_API RESPONSE............", raw);

    // ✅ Map proper fields for pie chart and tooltip use
    result = Array.isArray(raw)
      ? raw.map((item) => ({
          name: item.name || "Unnamed Category",
          value: item.value || 0,
          courseCount: item.courseCount || 0,
          studentCount: item.studentCount || 0,
        }))
      : [];

  } catch (error) {
    console.error("COURSE ANALYTICS API ERROR............", error);
    toast.error(error.message || "Failed to fetch course analytics");
    throw error;
  } finally {
    dispatch?.(setLoading(false));
    toast.dismiss(toastId);
  }

  return result;
};

// ================ get Instructor Earnings ================
export const getInstructorEarnings = async (token, dispatch) => {
  const toastId = toast.loading("Fetching Instructor Earnings...");
  try {
    dispatch(setLoading(true));
    const response = await apiConnector(
      "GET",
      INSTRUCTOR_EARNINGS_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message || "Failed to fetch earnings");
    }

    return response.data.data;
  } catch (error) {
    console.error("INSTRUCTOR_EARNINGS_API ERROR:", error);
    toast.error("Could not load instructor earnings");
    return [];
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};



