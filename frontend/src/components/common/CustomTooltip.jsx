const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const { name, value, courseCount, studentCount } = payload[0].payload;
      return (
        <div className="bg-white p-2 rounded border shadow text-sm text-gray-800">
          <p className="font-semibold">{name}</p>
          <p>📘 Courses: {courseCount}</p>
          <p>👨‍🎓 Students: {studentCount}</p>
        </div>
      );
    }
    return null;
  };
  
  export default CustomTooltip;