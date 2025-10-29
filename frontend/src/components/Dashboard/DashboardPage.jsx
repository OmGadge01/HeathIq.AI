import Navbar from './DashboardNavbar';
import HomePage from './Homepage';

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 p-4">
        <HomePage />
      </main>
    </div>
  );
};

export default DashboardPage;
