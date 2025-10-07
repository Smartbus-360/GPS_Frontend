// // src/pages/ManageDrivers.js
// import { useEffect, useState, useCallback, useMemo } from "react";
// import axios from "axios";

// export default function ManageDrivers() {
//   const [drivers, setDrivers] = useState([]);
//   const [form, setForm] = useState({ name: "", username: "", password: "" });
//   const [editId, setEditId] = useState(null);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   // ✅ Memoize headers so they don’t recreate every render
//   const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

//   // ✅ Fetch drivers
//   const fetchDrivers = useCallback(async () => {
//     if (role !== "schooladmin") return; // only schooladmin can
//     try {
//       const res = await axios.get("https://gps.smartbus360.com/api/drivers", { headers });
//       setDrivers(res.data);
//     } catch (err) {
//       console.error("Error fetching drivers:", err);
//     }
//   }, [headers, role]);

//   useEffect(() => {
//     fetchDrivers();
//   }, [fetchDrivers]);

//   // ✅ Add or Update driver
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         // update driver
//         await axios.put(
//           `https://gps.smartbus360.com/api/drivers/${editId}`,
//           { name: form.name, password: form.password },
//           { headers }
//         );
//       } else {
//         // add driver
//         await axios.post("https://gps.smartbus360.com/api/drivers", form, { headers });
//       }
//       setForm({ name: "", username: "", password: "" });
//       setEditId(null);
//       fetchDrivers();
//     } catch (err) {
//       console.error("Error saving driver:", err);
//       alert(err.response?.data?.message || "Error saving driver");
//     }
//   };

//   // ✅ Delete driver
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this driver?")) return;
//     try {
//       await axios.delete(`https://gps.smartbus360.com/api/drivers/${id}`, { headers });
//       fetchDrivers();
//     } catch (err) {
//       console.error("Error deleting driver:", err);
//     }
//   };

//   // ✅ Edit driver (fills form)
//   const handleEdit = (driver) => {
//     setForm({ name: driver.name, username: driver.username, password: "" });
//     setEditId(driver.id);
//   };

//   if (role === "superadmin") {
//     return (
//       <div>
//         <h1 className="text-2xl font-bold mb-6">🚌 Manage Drivers</h1>
//         <p className="text-red-600">
//           ⚠️ Superadmin cannot directly manage drivers. Please log in as a school admin.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">🚌 Manage Drivers</h1>

//       {/* ✅ Add/Edit Driver Form */}
//       <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded shadow">
//         <h2 className="text-lg font-semibold mb-4">
//           {editId ? "✏️ Edit Driver" : "➕ Add Driver"}
//         </h2>
//         <div className="flex flex-wrap gap-2">
//           <input
//             type="text"
//             placeholder="Driver Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//             className="border px-3 py-2 rounded flex-1"
//           />
//           {!editId && (
//             <input
//               type="text"
//               placeholder="Username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               required
//               className="border px-3 py-2 rounded flex-1"
//             />
//           )}
//           <input
//             type="password"
//             placeholder={editId ? "New Password (optional)" : "Password"}
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="border px-3 py-2 rounded flex-1"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {editId ? "Update" : "Add"}
//           </button>
//           {editId && (
//             <button
//               type="button"
//               onClick={() => {
//                 setForm({ name: "", username: "", password: "" });
//                 setEditId(null);
//               }}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* ✅ Drivers Table */}
//       {drivers.length === 0 ? (
//         <p>No drivers found.</p>
//       ) : (
//         <table className="min-w-full bg-white border rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Username</th>
//               <th className="py-2 px-4 border">Role</th>
//               <th className="py-2 px-4 border">Created At</th>
//               <th className="py-2 px-4 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {drivers.map((driver) => (
//               <tr key={driver.id}>
//                 <td className="py-2 px-4 border">{driver.id}</td>
//                 <td className="py-2 px-4 border">{driver.name}</td>
//                 <td className="py-2 px-4 border">{driver.username}</td>
//                 <td className="py-2 px-4 border">{driver.role}</td>
//                 <td className="py-2 px-4 border">
//                   {new Date(driver.created_at).toLocaleDateString()}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   <button
//                     onClick={() => handleEdit(driver)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(driver.id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// src/pages/ManageDrivers.js
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

export default function ManageDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({ name: "", username: "", password: "" });
  const [editId, setEditId] = useState(null);
// 🆕 For storing and showing stops
const [selectedDriverId, setSelectedDriverId] = useState(null);
const [stops, setStops] = useState([]);
const [loadingStops, setLoadingStops] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  // ✅ Fetch drivers
  const fetchDrivers = useCallback(async () => {
    try {
      let url =
        role === "superadmin"
          ? "https://gps.smartbus360.com/api/drivers/all"
          : "https://gps.smartbus360.com/api/drivers";

      const res = await axios.get(url, { headers });
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  }, [headers, role]);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  // ✅ Add or Update driver (schooladmin only)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `https://gps.smartbus360.com/api/drivers/${editId}`,
          { name: form.name, password: form.password },
          { headers }
        );
      } else {
        await axios.post("https://gps.smartbus360.com/api/drivers", form, {
          headers,
        });
      }
      setForm({ name: "", username: "", password: "" });
      setEditId(null);
      fetchDrivers();
    } catch (err) {
      console.error("Error saving driver:", err);
      alert(err.response?.data?.message || "Error saving driver");
    }
  };

  // ✅ Delete driver
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;
    try {
      await axios.delete(`https://gps.smartbus360.com/api/drivers/${id}`, {
        headers,
      });
      fetchDrivers();
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  // ✅ Edit driver
  const handleEdit = (driver) => {
    setForm({ name: driver.name, username: driver.username, password: "" });
    setEditId(driver.id);
  };

  // 🆕 Fetch stops of a specific driver
const handleViewStops = async (driverId) => {
  try {
    setSelectedDriverId(driverId);
    setLoadingStops(true);
    const res = await axios.get(
      `https://gps.smartbus360.com/api/drivers/by-driver/${driverId}`,
      { headers }
    );
    setStops(res.data);
  } catch (err) {
    console.error("Error fetching stops:", err);
    alert("Failed to fetch stops");
  } finally {
    setLoadingStops(false);
  }
};


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🚌 Manage Drivers</h1>

      {/* ✅ Schooladmin can Add/Edit */}
      {role === "schooladmin" && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-100 p-4 rounded shadow"
        >
          <h2 className="text-lg font-semibold mb-4">
            {editId ? "✏️ Edit Driver" : "➕ Add Driver"}
          </h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Driver Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="border px-3 py-2 rounded flex-1"
            />
            {!editId && (
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="border px-3 py-2 rounded flex-1"
              />
            )}
            <input
              type="password"
              placeholder={editId ? "New Password (optional)" : "Password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="border px-3 py-2 rounded flex-1"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm({ name: "", username: "", password: "" });
                  setEditId(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* ✅ Drivers Table (visible to both) */}
      {drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">School</th>
              <th className="py-2 px-4 border">Created At</th>
              {(role === "schooladmin" || role === "superadmin") && (
                <th className="py-2 px-4 border">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="py-2 px-4 border">{driver.id}</td>
                <td className="py-2 px-4 border">{driver.name}</td>
                <td className="py-2 px-4 border">{driver.username}</td>
                <td className="py-2 px-4 border">{driver.role}</td>
                <td className="py-2 px-4 border">{driver.school_name}</td>
                <td className="py-2 px-4 border">
                  {new Date(driver.created_at).toLocaleDateString()}
                </td>
                // <td className="py-2 px-4 border">
                //   {(role === "schooladmin" || role === "superadmin") && (
                //     <>
                //       <button
                //         onClick={() => handleEdit(driver)}
                //         className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                //       >
                //         Edit
                //       </button>
                //       <button
                //         onClick={() => handleDelete(driver.id)}
                //         className="bg-red-600 text-white px-3 py-1 rounded"
                //       >
                //         Delete
                //       </button>
                //     </>
                //   )}
                // </td>
                  <td className="py-2 px-4 border space-x-2">
  <button
    onClick={() => handleViewStops(driver.id)}
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    View Stops
  </button>
  {(role === "schooladmin" || role === "superadmin") && (
    <>
      <button
        onClick={() => handleEdit(driver)}
        className="bg-yellow-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => handleDelete(driver.id)}
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
          
    </>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
{/* 🆕 Stops Section */}
{selectedDriverId && (
  <div className="mt-6 p-4 border rounded bg-gray-50 shadow">
    <h2 className="text-xl font-semibold mb-3">
      🛑 Stops assigned to Driver ID #{selectedDriverId}
    </h2>

    {loadingStops ? (
      <p>Loading stops...</p>
    ) : stops.length === 0 ? (
      <p>No stops found for this driver.</p>
    ) : (
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Round</th>
            <th className="py-2 px-4 border">Placename</th>
            <th className="py-2 px-4 border">Latitude</th>
            <th className="py-2 px-4 border">Longitude</th>
          </tr>
        </thead>
        <tbody>
          {stops.map((stop, i) => (
            <tr key={stop.id}>
              <td className="py-2 px-4 border">{i + 1}</td>
              <td className="py-2 px-4 border">{stop.round_name}</td>
              <td className="py-2 px-4 border">{stop.placename}</td>
              <td className="py-2 px-4 border">{stop.latitude}</td>
              <td className="py-2 px-4 border">{stop.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
<button
  onClick={() => setSelectedDriverId(null)}
  className="bg-gray-600 text-white px-3 py-1 rounded mt-2"
>
  Close
</button>

  </div>
)}

      )}
    </div>
  );
}
