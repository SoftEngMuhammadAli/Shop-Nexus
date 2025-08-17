export const AdminDashboardStatsCard = ({ title, count, loading }) => (
  <div className="bg-white shadow-md p-6 rounded-xl">
    <h2 className="text-lg font-semibold text-gray-600">{title}</h2>
    <p className="text-2xl font-bold text-blue-600 mt-2">
      {loading ? "Loading..." : count ?? 0}
    </p>
  </div>
);
