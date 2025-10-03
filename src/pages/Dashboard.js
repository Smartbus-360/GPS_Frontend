// // // src/pages/Dashboard.js
// // export default function Dashboard() {
// //   return <h1>📊 Dashboard (Counts will come here)</h1>;
// // }

// // // src/pages/ManageSchools.js
// // export default function ManageSchools() {
// //   return <h1>🏫 Manage Schools</h1>;
// // }

// // // src/pages/ManageDrivers.js
// // export default function ManageDrivers() {
// //   return <h1>🚌 Manage Drivers</h1>;
// // }

// // // src/pages/ManageStops.js
// // export default function ManageStops() {
// //   return <h1>🛑 Manage Stops</h1>;
// // }

// // src/pages/Dashboard.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [counts, setCounts] = useState({});
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${token}` };
//         let data = {};

//         if (role === "superadmin") {
//           const [schoolsRes, adminsRes, stopsRes] = await Promise.all([
//             axios.get("https://gps.smartbus360.com/api/schools", { headers }),
//             axios.get("https://gps.smartbus360.com/api/schooladmins", { headers }),
//             axios.get("https://gps.smartbus360.com/api/stops/all", { headers }),
//           ]);

//           data = {
//             schools: schoolsRes.data.length,
//             admins: adminsRes.data.length,
//             stops: stopsRes.data.length,
//           };
//         } else if (role === "schooladmin") {
//           const [driversRes, stopsRes] = await Promise.all([
//             axios.get("https://gps.smartbus360.com/api/drivers", { headers }),
//             axios.get("https://gps.smartbus360.com/api/stops/school", { headers }),
//           ]);

//           data = {
//             drivers: driversRes.data.length,
//             stops: stopsRes.data.length,
//           };
//         }

//         setCounts(data);
//       } catch (err) {
//         console.error("Error fetching dashboard counts:", err);
//       }
//     };

//     fetchCounts();
//   }, [role, token]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

//       {role === "superadmin" && (
//         <div className="grid grid-cols-3 gap-6">
//           <div className="bg-blue-200 p-6 rounded shadow">
//             <h2 className="text-xl font-bold">Schools</h2>
//             <p className="text-3xl">{counts.schools || 0}</p>
//           </div>
//           <div className="bg-green-200 p-6 rounded shadow">
//             <h2 className="text-xl font-bold">Admins</h2>
//             <p className="text-3xl">{counts.admins || 0}</p>
//           </div>
//           <div className="bg-purple-200 p-6 rounded shadow">
//             <h2 className="text-xl font-bold">Stops</h2>
//             <p className="text-3xl">{counts.stops || 0}</p>
//           </div>
//         </div>
//       )}

//       {role === "schooladmin" && (
//         <div className="grid grid-cols-2 gap-6">
//           <div className="bg-orange-200 p-6 rounded shadow">
//             <h2 className="text-xl font-bold">Drivers</h2>
//             <p className="text-3xl">{counts.drivers || 0}</p>
//           </div>
//           <div className="bg-pink-200 p-6 rounded shadow">
//             <h2 className="text-xl font-bold">Stops</h2>
//             <p className="text-3xl">{counts.stops || 0}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        let data = {};

        if (role === "superadmin") {
          const [schoolsRes, adminsRes, stopsRes] = await Promise.all([
            axios.get("https://gps.smartbus360.com/api/schools", { headers }),
            axios.get("https://gps.smartbus360.com/api/schooladmins", { headers }),
            axios.get("https://gps.smartbus360.com/api/stops/all", { headers }),
          ]);

          data = {
            schools: schoolsRes.data.length,
            admins: adminsRes.data.length,
            stops: stopsRes.data.length,
          };
        } else if (role === "schooladmin") {
          const [driversRes, stopsRes] = await Promise.all([
            axios.get("https://gps.smartbus360.com/api/drivers", { headers }),
            axios.get("https://gps.smartbus360.com/api/stops/school", { headers }),
          ]);

          data = {
            drivers: driversRes.data.length,
            stops: stopsRes.data.length,
          };
        }

        setCounts(data);
      } catch (err) {
        console.error("Error fetching dashboard counts:", err);
      }
    };

    fetchCounts();
  }, [role, token]);

  return (
    <Layout>
      <h1 className="dashboard-title">📊 Dashboard</h1>

      {role === "superadmin" && (
        <div className="stats-grid">
          <div className="stat-card blue">
            <h2>Schools</h2>
            <p>{counts.schools || 0}</p>
          </div>
          <div className="stat-card green">
            <h2>Admins</h2>
            <p>{counts.admins || 0}</p>
          </div>
          <div className="stat-card purple">
            <h2>Stops</h2>
            <p>{counts.stops || 0}</p>
          </div>
        </div>
      )}

      {role === "schooladmin" && (
        <div className="stats-grid">
          <div className="stat-card orange">
            <h2>Drivers</h2>
            <p>{counts.drivers || 0}</p>
          </div>
          <div className="stat-card pink">
            <h2>Stops</h2>
            <p>{counts.stops || 0}</p>
          </div>
        </div>
      )}
    </Layout>
  );
}
