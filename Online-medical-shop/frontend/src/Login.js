// import React, { useState } from 'react';

// function Login({ onLogin, message }) {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginType, setLoginType] = useState('user'); 

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Save username for checkout page
//     localStorage.setItem("username", username);
//     localStorage.setItem("loginType", loginType);
//     onLogin(username, password, loginType);
//   };

//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
//       style={{
//         backgroundImage: "url('/medical.jpg')",
//       }}
//     >
//       <div className="absolute inset-0 bg-black opacity-30"></div>

//       <div className="relative z-10 bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/30">
//         <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
//           Login
//         </h2>

//         <p className="text-sm text-gray-200 text-center mb-4">
//           Select your login type and enter credentials.
//         </p>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-100 mb-1">
//             Login Type
//           </label>
//           <select
//             value={loginType}
//             onChange={(e) => setLoginType(e.target.value)}
//             className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/70 focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-100 mb-1">Username</label>
//             <input
//               type="text"
//               required value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-100 mb-1">Password</label>
//             <input
//               type="password"
//               required value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
//           >
//             Login
//           </button>
//         </form>

//         {message && message.type === 'error' && (
//           <div className="p-3 mt-4 rounded-lg text-sm bg-red-100 text-red-700 text-center">
//             {message.text}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;





import React, { useState } from 'react';

function Login({ onLogin, message }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('user'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password, loginType);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/medical.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Login
        </h2>

        <p className="text-sm text-gray-200 text-center mb-4">
          Select your login type and enter credentials.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-100 mb-1">
            Login Type
          </label>
          <select
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/70 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white/70 focus:bg-white focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {message && message.type === 'error' && (
          <div className="p-3 mt-4 rounded-lg text-sm bg-red-100 text-red-700 text-center">
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
