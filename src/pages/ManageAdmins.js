// // src/pages/ManageAdmins.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ManageAdmins() {
//   const [admins, setAdmins] = useState([]);
//   const [schools, setSchools] = useState([]);
//   const [form, setForm] = useState({ username: "", password: "", school_id: "" });
//   const [editId, setEditId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     if (role === "superadmin") {
//       fetchAdmins();
//       fetchSchools();
//     }
//   }, []);

//   const fetchAdmins = async () => {
//     try {
//       const res = await axios.get("https://gps.smartbus360.com/api/schooladmins", { headers });
//       setAdmins(res.data);
//     } catch (err) {
//       console.error("Error fetching admins:", err);
//     }
//   };

//   const fetchSchools = async () => {
//     try {
//       const res = await axios.get("https://gps.smartbus360.com/api/schools", { headers });
//       setSchools(res.data);
//     } catch (err) {
//       console.error("Error fetching schools:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await axios.put(
//           `https://gps.smartbus360.com/api/schooladmins/${editId}`,
//           form,
//           { headers }
//         );
//       } else {
//         await axios.post("https://gps.smartbus360.com/api/schooladmins", form, { headers });
//       }
//       setForm({ username: "", password: "", school_id: "" });
//       setEditId(null);
//       fetchAdmins();
//     } catch (err) {
//       console.error("Error saving admin:", err);
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`https://gps.smartbus360.com/api/schooladmins/${deleteId}`, { headers });
//       setDeleteId(null);
//       fetchAdmins();
//     } catch (err) {
//       console.error("Error deleting admin:", err);
//     }
//   };

//   const handleEdit = (admin) => {
//     const school = schools.find((s) => s.name === admin.school_name);
//     setForm({
//       username: admin.username,
//       password: "",
//       school_id: school ? school.id : "",
//     });
//     setEditId(admin.id);
//   };

//   if (role !== "superadmin") {
//     return <p className="text-red-600">⚠️ Only Superadmin can manage admins.</p>;
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">👨‍💼 Manage School Admins</h1>

//       {/* Add/Edit Form */}
//       <form onSubmit={handleSubmit} className="mb-6 bg-gray-100 p-4 rounded">
//         <input
//           type="text"
//           placeholder="Username"
//           value={form.username}
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//           required
//           className="border px-3 py-2 mr-2 rounded"
//         />
//         <input
//           type="password"
//           placeholder={editId ? "New Password (optional)" : "Password"}
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//           className="border px-3 py-2 mr-2 rounded"
//         />
//         <select
//           value={form.school_id}
//           onChange={(e) => setForm({ ...form, school_id: e.target.value })}
//           required
//           className="border px-3 py-2 mr-2 rounded"
//         >
//           <option value="">Select School</option>
//           {schools.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           {editId ? "Update" : "Add"}
//         </button>
//       </form>

//       {/* Admins Table */}
//       <table className="min-w-full bg-white border rounded shadow">
//         <thead>
//           <tr className="bg-gray-200 text-left">
//             <th className="py-2 px-4 border">ID</th>
//             <th className="py-2 px-4 border">Username</th>
//             <th className="py-2 px-4 border">School</th>
//             <th className="py-2 px-4 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {admins.map((admin) => (
//             <tr key={admin.id}>
//               <td className="py-2 px-4 border">{admin.id}</td>
//               <td className="py-2 px-4 border">{admin.username}</td>
//               <td className="py-2 px-4 border">{admin.school_name}</td>
//               <td className="py-2 px-4 border">
//                 <button
//                   onClick={() => handleEdit(admin)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => setDeleteId(admin.id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Delete Modal */}
//       {deleteId && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg w-96">
//             <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
//             <p className="mb-4">Are you sure you want to delete this admin?</p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setDeleteId(null)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// src/pages/ManageAdmins.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./ManageAdmins.css"; // ✅ Import CSS

export default function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({ username: "", password: "", school_id: "" });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (role === "superadmin") {
      fetchAdmins();
      fetchSchools();
    }
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("https://gps.smartbus360.com/api/schooladmins", { headers });
      setAdmins(res.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const fetchSchools = async () => {
    try {
      const res = await axios.get("https://gps.smartbus360.com/api/schools", { headers });
      setSchools(res.data);
    } catch (err) {
      console.error("Error fetching schools:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `https://gps.smartbus360.com/api/schooladmins/${editId}`,
          form,
          { headers }
        );
      } else {
        await axios.post("https://gps.smartbus360.com/api/schooladmins", form, { headers });
      }
      setForm({ username: "", password: "", school_id: "" });
      setEditId(null);
      fetchAdmins();
    } catch (err) {
      console.error("Error saving admin:", err);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://gps.smartbus360.com/api/schooladmins/${deleteId}`, { headers });
      setDeleteId(null);
      fetchAdmins();
    } catch (err) {
      console.error("Error deleting admin:", err);
    }
  };

  const handleEdit = (admin) => {
    const school = schools.find((s) => s.name === admin.school_name);
    setForm({
      username: admin.username,
      password: "",
      school_id: school ? school.id : "",
    });
    setEditId(admin.id);
  };

  if (role !== "superadmin") {
    return <p className="error-msg">⚠️ Only Superadmin can manage admins.</p>;
  }

  return (
    <div className="admins-container">
      <h1 className="page-title">👨‍💼 Manage School Admins</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="admin-form">
        <h2>{editId ? "✏️ Edit Admin" : "➕ Add Admin"}</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder={editId ? "New Password (optional)" : "Password"}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          value={form.school_id}
          onChange={(e) => setForm({ ...form, school_id: e.target.value })}
          required
        >
          <option value="">Select School</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn primary">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setForm({ username: "", password: "", school_id: "" });
              setEditId(null);
            }}
            className="btn secondary"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Admins Table */}
      {admins.length === 0 ? (
        <p>No admins found.</p>
      ) : (
        <div className="table-card">
          <table className="admins-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>School</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.id}</td>
                  <td>{admin.username}</td>
                  <td>{admin.school_name}</td>
                  <td>
                    <button onClick={() => handleEdit(admin)} className="btn edit">
                      Edit
                    </button>
                    <button onClick={() => setDeleteId(admin.id)} className="btn delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this admin?</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteId(null)} className="btn secondary">
                Cancel
              </button>
              <button onClick={confirmDelete} className="btn delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
