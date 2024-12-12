// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles.css"; // Import the CSS file for styles

// function LandingPage() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 text-white ">
//       <h1 className="text-6xl font-extrabold text-center mb-10 drop-shadow-lg font-bebas tracking-widest">
//         NiftyWatch
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 md:px-12">
//         <Link to="/page1" className="btn">
//           Nifty 50 Returns - Last 20 years
//         </Link>

//         <Link to="/page2" className="btn">
//           Nifty 50 PE Ratio - Last 20 years
//         </Link>

//         <div className="relative">
//           <button onClick={toggleDropdown} className="btn relative w-full">
//             Nifty Heatmaps
//           </button>

//           {dropdownOpen && (
//             <div className="absolute mt-2 bg-white text-sm text-black shadow-lg rounded w-full">
//               <Link to="/page3A" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty50
//               </Link>

//               <Link to="/page3B" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty Next50
//               </Link>

//               <Link to="/page3C" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty Bank
//               </Link>

//               <Link to="/page3D" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty Finance
//               </Link>

//               <Link to="/page3E" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty IT
//               </Link>

//               <Link to="/page3F" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty Auto
//               </Link>

//               <Link to="/page3G" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty FMCG
//               </Link>

//               <Link to="/page3H" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty Energy
//               </Link>

//               <Link to="/page3I" className="block px-4 py-2 hover:bg-gray-200">
//                 Nifty Pharma
//               </Link>

//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function LandingPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 text
    -white border-4 ">
      <header className="text-center py-6">
        <h1 className="text-6xl font-extrabold drop-shadow-lg font-bebas tracking-widest text-white">
          NiftyWatch
        </h1>
      </header>

      <div className="flex-grow flex flex-col items-center space-y-4 px-6 md:px-12 justify-start pt-24">
        {/* <Link to="/page1" className="btn w-full max-w-md text-center">
          Nifty 50
        </Link> */}

        <Link to="/page2A" className="btn w-full max-w-md text-center">
          Nifty 50 Returns - Last 20 years
        </Link>

        <Link to="/page2B" className="btn w-full max-w-md text-center">
          Nifty 50 PE Ratio - Last 20 years
        </Link>

        

        <div className="relative w-full max-w-md">
          <button onClick={toggleDropdown} className="btn w-full">
            Nifty Heatmaps
          </button>

          {dropdownOpen && (
            <div className="absolute mt-2 bg-white text-sm text-black shadow-lg rounded w-full">
              <Link to="/page3A" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Metal
              </Link>

              <Link to="/page3B" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Consumption
              </Link>

              <Link to="/page3C" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Bank
              </Link>

              <Link to="/page3D" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Finance
              </Link>

              <Link to="/page3E" className="block px-4 py-2 hover:bg-gray-200">
                Nifty IT
              </Link>

              <Link to="/page3F" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Auto
              </Link>

              <Link to="/page3G" className="block px-4 py-2 hover:bg-gray-200">
                Nifty FMCG
              </Link>

              <Link to="/page3H" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Energy
              </Link>

              <Link to="/page3I" className="block px-4 py-2 hover:bg-gray-200">
                Nifty Pharma
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
