// // src/pages/ManageStops.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageStops() {
//   const [stops, setStops] = useState([]);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
// const [roundFilter, setRoundFilter] = useState("");
// const [driverFilter, setDriverFilter] = useState("");

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchStops();
//   }, []);

//   // ✅ Fetch stops
//   const fetchStops = async () => {
//     try {
//       let url = "";
//       if (role === "superadmin") {
//         url = "https://gps.smartbus360.com/api/stops/all";
//       } else if (role === "schooladmin") {
//         url = "https://gps.smartbus360.com/api/stops/school";
//       }
//       const res = await axios.get(url, { headers });
//       setStops(res.data);
//     } catch (err) {
//       console.error("Error fetching stops:", err);
//     }
//   };

//   // ✅ Export stops CSV
//   const exportStops = async () => {
//     try {
//       let url = "";
//       if (role === "superadmin") {
//         url = "https://gps.smartbus360.com/api/stops/export/all";
//       } else if (role === "schooladmin") {
//         url = "https://gps.smartbus360.com/api/stops/export/school";
//       }

//       const res = await axios.get(url, {
//         headers,
//         responseType: "blob", // download CSV
//       });

//       const blob = new Blob([res.data], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download =
//         role === "superadmin" ? "stops_all.csv" : "stops_school.csv";
//       link.click();
//     } catch (err) {
//       console.error("Error exporting CSV:", err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">🛑 Manage Stops</h1>

//       <button
//         onClick={exportStops}
//         className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         ⬇️ Export CSV
//       </button>

//       {stops.length === 0 ? (
//         <p>No stops found.</p>
//       ) : (
//         <table className="min-w-full bg-white border rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Round</th>
//               <th className="py-2 px-4 border">Stop Order</th>
//               <th className="py-2 px-4 border">Latitude</th>
//               <th className="py-2 px-4 border">Longitude</th>
//               <th className="py-2 px-4 border">Placename</th>
//               <th className="py-2 px-4 border">Driver</th>
//               <th className="py-2 px-4 border">School</th>
//               <th className="py-2 px-4 border">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stops.map((stop) => (
//               <tr key={stop.id}>
//                 <td className="py-2 px-4 border">{stop.id}</td>
//                 <td className="py-2 px-4 border">{stop.round_name}</td>
//                 <td className="py-2 px-4 border">{stop.stop_order}</td>
//                 <td className="py-2 px-4 border">{stop.latitude}</td>
//                 <td className="py-2 px-4 border">{stop.longitude}</td>
//                 <td className="py-2 px-4 border">{stop.placename}</td>
//                 <td className="py-2 px-4 border">{stop.driver_name}</td>
//                 <td className="py-2 px-4 border">{stop.school_name}</td>
//                 <td className="py-2 px-4 border">
//                   {new Date(stop.created_at).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// src/pages/ManageStops.js
// src/pages/ManageStops.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageStops() {
//   const [stops, setStops] = useState([]);
//   const [drivers, setDrivers] = useState([]);
//   const [roundFilter, setRoundFilter] = useState("");
//   const [driverFilter, setDriverFilter] = useState("");

//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchStops();
//     if (role === "schooladmin") {
//       fetchDrivers();
//     }
//   }, [role]);

//   // ✅ Fetch stops (with filters for schooladmin)
//   const fetchStops = async () => {
//     try {
//       let url = "";
//       if (role === "superadmin") {
//         url = "https://gps.smartbus360.com/api/stops/all";
//       } else if (role === "schooladmin") {
//         url = "https://gps.smartbus360.com/api/stops/school";

//         const params = new URLSearchParams();
//         if (roundFilter) params.append("round", roundFilter);
//         if (driverFilter) params.append("driver_id", driverFilter);

//         if (params.toString()) {
//           url += `?${params.toString()}`;
//         }
//       }

//       const res = await axios.get(url, { headers });
//       setStops(res.data);
//     } catch (err) {
//       console.error("Error fetching stops:", err);
//     }
//   };

//   // ✅ Fetch drivers list for dropdown
//   const fetchDrivers = async () => {
//     try {
//       const res = await axios.get("https://gps.smartbus360.com/api/drivers", {
//         headers,
//       });
//       setDrivers(res.data);
//     } catch (err) {
//       console.error("Error fetching drivers:", err);
//     }
//   };

//   // ✅ Export stops CSV (with filters for schooladmin)
//   const exportStops = async () => {
//     try {
//       let url = "";
//       if (role === "superadmin") {
//         url = "https://gps.smartbus360.com/api/stops/export/all";
//       } else if (role === "schooladmin") {
//         url = "https://gps.smartbus360.com/api/schooladmins/export/school";

//         const params = new URLSearchParams();
//         if (roundFilter) params.append("round", roundFilter);
//         if (driverFilter) params.append("driver_id", driverFilter);

//         if (params.toString()) {
//           url += `?${params.toString()}`;
//         }
//       }

//       const res = await axios.get(url, {
//         headers,
//         responseType: "blob",
//       });

//       const blob = new Blob([res.data], { type: "text/csv" });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download =
//         role === "superadmin" ? "stops_all.csv" : "stops_school.csv";
//       link.click();
//     } catch (err) {
//       console.error("Error exporting CSV:", err);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">🛑 Manage Stops</h1>

//       {/* Filter inputs (only for schooladmin) */}
//       {role === "schooladmin" && (
//         <div className="flex gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Round Name"
//             value={roundFilter}
//             onChange={(e) => setRoundFilter(e.target.value)}
//             className="border px-2 py-1 rounded"
//           />
//           <select
//             value={driverFilter}
//             onChange={(e) => setDriverFilter(e.target.value)}
//             className="border px-2 py-1 rounded"
//           >
//             <option value="">All Drivers</option>
//             {drivers.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.id} - {d.name}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={fetchStops}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             Apply Filters
//           </button>
//         </div>
//       )}

//       <button
//         onClick={exportStops}
//         className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
//       >
//         ⬇️ Export CSV
//       </button>

//       {stops.length === 0 ? (
//         <p>No stops found.</p>
//       ) : (
//         <table className="min-w-full bg-white border rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Round</th>
//               <th className="py-2 px-4 border">Stop Order</th>
//               <th className="py-2 px-4 border">Latitude</th>
//               <th className="py-2 px-4 border">Longitude</th>
//               <th className="py-2 px-4 border">Placename</th>
//               <th className="py-2 px-4 border">Driver</th>
//               <th className="py-2 px-4 border">School</th>
//               <th className="py-2 px-4 border">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stops.map((stop) => (
//               <tr key={stop.id}>
//                 <td className="py-2 px-4 border">{stop.id}</td>
//                 <td className="py-2 px-4 border">{stop.round_name}</td>
//                 <td className="py-2 px-4 border">{stop.stop_order}</td>
//                 <td className="py-2 px-4 border">{stop.latitude}</td>
//                 <td className="py-2 px-4 border">{stop.longitude}</td>
//                 <td className="py-2 px-4 border">
//                   {stop.placename || "N/A"}
//                 </td>
//                 <td className="py-2 px-4 border">{stop.driver_name}</td>
//                 <td className="py-2 px-4 border">{stop.school_name}</td>
//                 <td className="py-2 px-4 border">
//                   {new Date(stop.created_at).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


// src/pages/ManageStops.js
import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageStops() {
  const [stops, setStops] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [roundFilter, setRoundFilter] = useState("");
  const [driverFilter, setDriverFilter] = useState("");
  const [driverNameFilter, setDriverNameFilter] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const headers = { Authorization: `Bearer ${token}` };

  // ✅ Fetch drivers for both superadmin and schooladmin
  useEffect(() => {
    if (role === "superadmin" || role === "schooladmin") {
      fetchDrivers();
    }
  }, [role]);

  // ✅ Fetch stops whenever filters or role change
  useEffect(() => {
    fetchStops();
  }, [role, roundFilter, driverFilter, driverNameFilter]);

  // ✅ Fetch stops
  const fetchStops = async () => {
    try {
      let url = "";
      const params = new URLSearchParams();

      if (roundFilter) params.append("round", roundFilter);
      if (driverFilter) params.append("driver_id", driverFilter);
      if (driverNameFilter) params.append("driver_name", driverNameFilter);

      if (role === "superadmin") {
        url = "https://gps.smartbus360.com/api/stops/all";
      } else if (role === "schooladmin") {
        url = "https://gps.smartbus360.com/api/stops/school";
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await axios.get(url, { headers });
      setStops(res.data);
    } catch (err) {
      console.error("Error fetching stops:", err);
    }
  };

  // ✅ Fetch drivers list
  const fetchDrivers = async () => {
    try {
      const res = await axios.get("https://gps.smartbus360.com/api/drivers", {
        headers,
      });
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  // ✅ Export stops CSV (with filters)
  const exportStops = async () => {
    try {
      let url = "https://gps.smartbus360.com/api/stops/export/filter";
      const params = new URLSearchParams();

      if (roundFilter) params.append("round", roundFilter);
      if (driverFilter) params.append("driver_id", driverFilter);
      if (driverNameFilter) params.append("driver_name", driverNameFilter);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "filtered_stops.csv";
      link.click();
    } catch (err) {
      console.error("Error exporting CSV:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🛑 Manage Stops</h1>

      {/* ✅ Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Round Name"
          value={roundFilter}
          onChange={(e) => setRoundFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <select
          value={driverFilter}
          onChange={(e) => setDriverFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Drivers (by ID)</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.id} - {d.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Driver Name"
          value={driverNameFilter}
          onChange={(e) => setDriverNameFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* ✅ Export Button */}
      <button
        onClick={exportStops}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        ⬇️ Export CSV
      </button>

      {/* ✅ Stops Table */}
      {stops.length === 0 ? (
        <p>No stops found.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Round</th>
              <th className="py-2 px-4 border">Stop Order</th>
              <th className="py-2 px-4 border">Latitude</th>
              <th className="py-2 px-4 border">Longitude</th>
              <th className="py-2 px-4 border">Placename</th>
              <th className="py-2 px-4 border">Driver</th>
              <th className="py-2 px-4 border">School</th>
              <th className="py-2 px-4 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {stops.map((stop) => (
              <tr key={stop.id}>
                <td className="py-2 px-4 border">{stop.id}</td>
                <td className="py-2 px-4 border">{stop.round_name}</td>
                <td className="py-2 px-4 border">{stop.stop_order}</td>
                <td className="py-2 px-4 border">{stop.latitude}</td>
                <td className="py-2 px-4 border">{stop.longitude}</td>
                <td className="py-2 px-4 border">
                  {stop.placename || "N/A"}
                </td>
                <td className="py-2 px-4 border">{stop.driver_name}</td>
                <td className="py-2 px-4 border">{stop.school_name}</td>
                <td className="py-2 px-4 border">
                  {new Date(stop.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
