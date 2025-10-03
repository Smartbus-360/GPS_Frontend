// // // src/pages/Login.js
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function Login() {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post("https://gps.smartbus360.com/api/login", {
// //         username,
// //         password,
// //       });

// //       // ✅ Save data to localStorage
// //       localStorage.setItem("token", res.data.token);
// //       localStorage.setItem("role", res.data.role);
// //       localStorage.setItem("school_id", res.data.school_id);

// //       // ✅ Redirect based on role
// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.error(err);
// //       setError(err.response?.data?.message || "Login failed");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center h-screen bg-gray-100">
// //       <form
// //         onSubmit={handleLogin}
// //         className="bg-white p-8 rounded shadow-md w-96"
// //       >
// //         <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

// //         {error && <p className="text-red-500 mb-4">{error}</p>}

// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           onChange={(e) => setUsername(e.target.value)}
// //           className="w-full px-4 py-2 border rounded mb-4"
// //           required
// //         />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           className="w-full px-4 py-2 border rounded mb-4"
// //           required
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //         >
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }


// // src/pages/Login.js
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://gps.smartbus360.com/api/login", {
//         username,
//         password,
//       });

//       // ✅ Save data to localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("school_id", res.data.school_id);

//       // ✅ Redirect based on role
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-sm">
//         <form
//           onSubmit={handleLogin}
//           className="bg-white shadow-lg rounded-lg px-8 py-10"
//         >
//           <h2 className="text-xl font-semibold text-center mb-6">
//             School Admin Login
//           </h2>

//           {error && (
//             <p className="text-red-500 text-sm text-center mb-4">{error}</p>
//           )}

//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// src/pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // ✅ Import CSS

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://gps.smartbus360.com/api/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("school_id", res.data.school_id);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2 className="login-title">School Admin Login</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
