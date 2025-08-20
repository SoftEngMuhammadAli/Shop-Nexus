export const AdminDashboardStatsCard = ({
  title,
  count,
  loading,
  icon: Icon,
  gradient = "from-blue-500 via-indigo-500 to-purple-500",
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} shadow-md p-6 rounded-xl text-white flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        {Icon && <Icon className="text-2xl sm:text-3xl opacity-80" />}
      </div>
      <p className="text-2xl sm:text-3xl font-bold mt-3">
        {loading ? "Loading..." : count ?? 0}
      </p>
    </div>
  );
};
