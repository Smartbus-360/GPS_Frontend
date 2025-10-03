// // src/pages/ManageSchools.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageSchools() {
//   const [schools, setSchools] = useState([]);
//   const [form, setForm] = useState({ name: "", address: "" });
//   const [editId, setEditId] = useState(null);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
//   const schoolId = localStorage.getItem("school_id");

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const fetchSchools = async () => {
//     try {
//       const res = await axios.get("https://gps.smartbus360.com/api/schools", { headers });

//       if (role === "superadmin") {
//         setSchools(res.data);
//       } else {
//         const mySchool = res.data.find((s) => s.id === parseInt(schoolId));
//         setSchools(mySchool ? [mySchool] : []);
//       }
//     } catch (err) {
//       console.error("Error fetching schools:", err);
//     }
//   };

//   // ✅ Add or Update school
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await axios.put(
//           `https://gps.smartbus360.com/api/schools/${editId}`,
//           form,
//           { headers }
//         );
//       } else {
//         await axios.post("https://gps.smartbus360.com/api/schools", form, { headers });
//       }
//       setForm({ name: "", address: "" });
//       setEditId(null);
//       fetchSchools();
//     } catch (err) {
//       console.error("Error saving school:", err);
//     }
//   };

//   // ✅ Delete school
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this school?")) return;
//     try {
//       await axios.delete(`https://gps.smartbus360.com/api/schools/${id}`, { headers });
//       fetchSchools();
//     } catch (err) {
//       console.error("Error deleting school:", err);
//     }
//   };

//   // ✅ Fill form for editing
//   const handleEdit = (school) => {
//     setForm({ name: school.name, address: school.address });
//     setEditId(school.id);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">🏫 Manage Schools</h1>

//       {/* ✅ Superadmin Only - Add/Edit Form */}
//       {role === "superadmin" && (
//         <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
//           <h2 className="text-lg font-semibold mb-4">
//             {editId ? "✏️ Edit School" : "➕ Add School"}
//           </h2>
//           <input
//             type="text"
//             placeholder="School Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//             className="border px-3 py-2 mr-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Address"
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//             required
//             className="border px-3 py-2 mr-2 rounded"
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
//                 setForm({ name: "", address: "" });
//                 setEditId(null);
//               }}
//               className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </form>
//       )}

//       {/* ✅ School List Table */}
//       {schools.length === 0 ? (
//         <p>No schools found.</p>
//       ) : (
//         <table className="min-w-full bg-white border rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-left">
//               <th className="py-2 px-4 border">ID</th>
//               <th className="py-2 px-4 border">Name</th>
//               <th className="py-2 px-4 border">Address</th>
//               {role === "superadmin" && <th className="py-2 px-4 border">Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {schools.map((school) => (
//               <tr key={school.id}>
//                 <td className="py-2 px-4 border">{school.id}</td>
//                 <td className="py-2 px-4 border">{school.name}</td>
//                 <td className="py-2 px-4 border">{school.address}</td>
//                 {role === "superadmin" && (
//                   <td className="py-2 px-4 border">
//                     <button
//                       onClick={() => handleEdit(school)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(school.id)}
//                       className="bg-red-600 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// src/pages/ManageSchools.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageSchools.css"; // ✅ Import CSS file

export default function ManageSchools() {
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({ name: "", address: "" });
  const [editId, setEditId] = useState(null);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const schoolId = localStorage.getItem("school_id");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await axios.get("https://gps.smartbus360.com/api/schools", { headers });

      if (role === "superadmin") {
        setSchools(res.data);
      } else {
        const mySchool = res.data.find((s) => s.id === parseInt(schoolId));
        setSchools(mySchool ? [mySchool] : []);
      }
    } catch (err) {
      console.error("Error fetching schools:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `https://gps.smartbus360.com/api/schools/${editId}`,
          form,
          { headers }
        );
      } else {
        await axios.post("https://gps.smartbus360.com/api/schools", form, { headers });
      }
      setForm({ name: "", address: "" });
      setEditId(null);
      fetchSchools();
    } catch (err) {
      console.error("Error saving school:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this school?")) return;
    try {
      await axios.delete(`https://gps.smartbus360.com/api/schools/${id}`, { headers });
      fetchSchools();
    } catch (err) {
      console.error("Error deleting school:", err);
    }
  };

  const handleEdit = (school) => {
    setForm({ name: school.name, address: school.address });
    setEditId(school.id);
  };

  return (
    <div className="schools-container">
      <h1 className="page-title">🏫 Manage Schools</h1>

      {role === "superadmin" && (
        <form onSubmit={handleSubmit} className="school-form">
          <h2>{editId ? "✏️ Edit School" : "➕ Add School"}</h2>
          <input
            type="text"
            placeholder="School Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <button type="submit" className="btn primary">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setForm({ name: "", address: "" });
                setEditId(null);
              }}
              className="btn secondary"
            >
              Cancel
            </button>
          )}
        </form>
      )}

      {schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <div className="table-card">
          <table className="schools-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>School Name</th>
                <th>Address</th>
                {role === "superadmin" && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id}>
                  <td>{school.id}</td>
                  <td>{school.name}</td>
                  <td>{school.address}</td>
                  {role === "superadmin" && (
                    <td>
                      <button onClick={() => handleEdit(school)} className="btn edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(school.id)} className="btn delete">
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
