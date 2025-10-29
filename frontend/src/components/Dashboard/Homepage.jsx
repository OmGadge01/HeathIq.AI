import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  User,
  Activity,
  Droplet,
  Flame,
  Heart,
  Coffee,
  Smile,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const COLORS = [
  "#4ade80",
  "#3b82f6",
  "#f97316",
  "#f87171",
  "#eab308",
  "#8b5cf6",
];

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log("Using API:", API_BASE); // ✅ Add this temporarily

  fetch(`${API_BASE}/api/users`)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        setUserData(data[0]);
      }
    })
    .catch((err) => console.error("Failed to fetch user data:", err));
}, []);


  if (!userData) {
    return <div className="p-6 text-lg">Loading user data...</div>;
  }

  // Use fetched userData here
  const exerciseTypeData = [{ name: userData.exerciseType, value: 100 }];

  const mealTypeData = [{ name: userData.mealType, value: 100 }];

  const alcoholData = [{ name: userData.alcohol, value: 100 }];

  const smokingData = [{ name: userData.smoking ? "Yes" : "No", value: 100 }];

  const snacksData = [{ name: userData.snacksFrequency, value: 100 }];

  const sugarData = [{ name: userData.sugarIntake, value: 100 }];

  const stressData = [{ name: "Stress Level", value: userData.stress }];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        Health Dashboard for {userData.name}
      </h1>

      {/* Personal Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <User className="text-blue-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Age</p>
            <p className="text-lg font-semibold">{userData.age} years</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <User className="text-purple-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Gender</p>
            <p className="text-lg font-semibold">{userData.gender}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Activity className="text-green-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Exercise Frequency</p>
            <p className="text-lg font-semibold">
              {userData.exerciseFrequency}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Activity className="text-orange-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Exercise Type</p>
            <p className="text-lg font-semibold">{userData.exerciseType}</p>
          </div>
        </div>
      </div>

      {/* Health Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Flame className="text-red-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Weight</p>
            <p className="text-lg font-semibold">{userData.weight} kg</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <User className="text-indigo-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Height</p>
            <p className="text-lg font-semibold">{userData.height} cm</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Droplet className="text-blue-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Water Intake</p>
            <p className="text-lg font-semibold">
              {userData.waterIntake} liters/day
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
          <Heart className="text-pink-500" size={36} />
          <div>
            <p className="text-gray-500 text-sm">Sleep</p>
            <p className="text-lg font-semibold">
              {userData.sleep} hours/night
            </p>
          </div>
        </div>
      </div>

      {/* Lifestyle and Habits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Alcohol Consumption */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
            <Coffee size={24} className="text-yellow-500" />
            <span>Alcohol Consumption</span>
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={50}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label
              >
                {alcoholData.map((entry, index) => (
                  <Cell
                    key={`cell-alcohol-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        {/* Smoking Status */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
            <Smile size={24} className="text-red-500" />
            <span>Smoking</span>
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={50}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label
              >
                {smokingData.map((entry, index) => (
                  <Cell
                    key={`cell-smoking-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        {/* Snacks Frequency */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3">Snacks Frequency</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={snacksData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                label
              >
                {snacksData.map((entry, index) => (
                  <Cell
                    key={`cell-snacks-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* Stress Level Bar */}
      <section className="bg-white p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold mb-4">Stress Level (1-10)</h3>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={66} layout="vertical" margin={{ left: 50 }}>
            <XAxis type="number" domain={[0, 10]} />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#f97316" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Sugar Intake */}
      <section className="bg-white p-4 rounded-lg shadow mt-8 max-w-xs">
        <h3 className="text-lg font-semibold mb-3">Sugar Intake</h3>
        <p className="text-gray-700">{userData.sugarIntake}</p>
      </section>
    </div>
  );
};

export default UserDashboard;
