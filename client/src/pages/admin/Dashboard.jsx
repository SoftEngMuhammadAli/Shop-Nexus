import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStats } from "../../features/";
import StatsCard from "../../components/admin/StatsCard";
import Loader from "../../components/ui/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminStats());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Products"
          value={stats?.productsCount}
          icon="📦"
          color="blue"
        />
        <StatsCard
          title="Total Orders"
          value={stats?.ordersCount}
          icon="🛒"
          color="green"
        />
        <StatsCard
          title="Total Users"
          value={stats?.usersCount}
          icon="👥"
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        {/* Orders table would go here */}
      </div>
    </div>
  );
};

export default Dashboard;
