// // // // src/components/Sidebar.js
// // // import { Link } from "react-router-dom";

// // // export default function Sidebar({ role }) {
// // //   return (
// // //     <div className="w-64 h-screen bg-gray-800 text-white p-4">
// // //       <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
// // //       <ul className="space-y-4">
// // //         <li><Link to="/dashboard">Dashboard</Link></li>

// // //         {role === "superadmin" && (
// // //           <>
// // //             <li><Link to="/schools">Manage Schools</Link></li>
// // //             <li><Link to="/admins">Manage Admins</Link></li>
// // //             <li><Link to="/drivers">Manage Drivers</Link></li>
// // //             <li><Link to="/stops">Manage Stops</Link></li>
// // //           </>
// // //         )}

// // //         {role === "schooladmin" && (
// // //           <>
// // //             <li><Link to="/schools">My School</Link></li>
// // //             <li><Link to="/drivers">Manage Drivers</Link></li>
// // //             <li><Link to="/stops">Manage Stops</Link></li>
// // //           </>
// // //         )}
// // //       </ul>
// // //     </div>
// // //   );
// // // }

// // // src/components/Sidebar.js
// // import { Link, useNavigate } from "react-router-dom";

// // export default function Sidebar({ role }) {
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.clear();        // remove token, role, school_id
// //     navigate("/login");          // redirect to login
// //   };

// //   return (
// //     <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
// //       <div>
// //         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
// //         <ul className="space-y-4">
// //           <li>
// //             <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
// //               Dashboard
// //             </Link>
// //           </li>

// //           {role === "superadmin" && (
// //             <>
// //               <li>
// //                 <Link to="/schools" className="block p-2 hover:bg-gray-700 rounded">
// //                   Manage Schools
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/admins" className="block p-2 hover:bg-gray-700 rounded">
// //                   Manage Admins
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/drivers" className="block p-2 hover:bg-gray-700 rounded">
// //                   Manage Drivers
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/stops" className="block p-2 hover:bg-gray-700 rounded">
// //                   Manage Stops
// //                 </Link>
// //               </li>
// //             </>
// //           )}

// //           {role === "schooladmin" && (
// //             <>
// //               <li>
// //                 <Link to="/schools" className="block p-2 hover:bg-gray-700 rounded">
// //                   My School
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/drivers" className="block p-2 hover:bg-gray-700 rounded">
// //                   Manage Drivers
// //                 </Link>
// //               </li>
// //               <li>
// //                 <Link to="/stops" className="block p-2 hover:bg-gray-700 rounded">
// //                   Manage Stops
// //                 </Link>
// //               </li>
// //             </>
// //           )}
// //         </ul>
// //       </div>

// //       {/* ✅ Logout Button */}
// //       <button
// //         onClick={handleLogout}
// //         className="w-full bg-red-600 text-white py-2 mt-6 rounded hover:bg-red-700"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }


// import { Link, useNavigate } from "react-router-dom";

// export default function Sidebar({ role }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();        // remove token, role, school_id
//     navigate("/login");          // redirect to login
//   };

//   return (
//     <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
//       <div>
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
//         <ul className="space-y-4">
//           <li>
//             <Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
//               Dashboard
//             </Link>
//           </li>

//           {role === "superadmin" && (
//             <>
//               <li>
//                 <Link to="/schools" className="block p-2 hover:bg-gray-700 rounded">
//                   Manage Schools
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/admins" className="block p-2 hover:bg-gray-700 rounded">
//                   Manage Admins
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/drivers" className="block p-2 hover:bg-gray-700 rounded">
//                   Manage Drivers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/stops" className="block p-2 hover:bg-gray-700 rounded">
//                   Manage Stops
//                 </Link>
//               </li>
//             </>
//           )}

//           {role === "schooladmin" && (
//             <>
//               <li>
//                 <Link to="/schools" className="block p-2 hover:bg-gray-700 rounded">
//                   My School
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/drivers" className="block p-2 hover:bg-gray-700 rounded">
//                   Manage Drivers
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/stops" className="block p-2 hover:bg-gray-700 rounded">
//                   Manage Stops
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* ✅ Logout button only if logged in */}
//       {role && (
//         <button
//           onClick={handleLogout}
//           className="w-full bg-red-600 text-white py-2 mt-6 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       )}
//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar-container">
      <div>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>

          {role === "superadmin" && (
            <>
              <li><Link to="/schools">Manage Schools</Link></li>
              <li><Link to="/admins">Manage Admins</Link></li>
              <li><Link to="/drivers">Manage Drivers</Link></li>
              <li><Link to="/stops">Manage Stops</Link></li>
            </>
          )}

          {role === "schooladmin" && (
            <>
              <li><Link to="/schools">My School</Link></li>
              <li><Link to="/drivers">Manage Drivers</Link></li>
              <li><Link to="/stops">Manage Stops</Link></li>
            </>
          )}
        </ul>
      </div>

      {role && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
