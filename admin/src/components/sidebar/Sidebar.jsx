// // import React from "react";
// // import styles from "./sidebar.module.css";
// // import { Link } from "react-router-dom";

// // export default function Sidebar({ closeSidebar }) {
// //   return (
// //     <div className={styles.sidebarOverlay} onClick={closeSidebar}>
// //       <aside
// //         className={styles.sidebar}
// //         onClick={(e) => e.stopPropagation()} // keep clicks inside from closing
// //         role="navigation"
// //         aria-label="Main navigation"
// //       >
// //         <button
// //           className={styles.closeBtn}
// //           onClick={closeSidebar}
// //           aria-label="Close sidebar"
// //         >
// //           ✖
// //         </button>

// //         <ul className={styles.menuList}>
// //           <li>
// //             <Link to="/category" onClick={closeSidebar}>
// //               Category
// //             </Link>
// //           </li>
// //           <li>
// //             <Link to="/products" onClick={closeSidebar}>
// //               Products
// //             </Link>
// //           </li>
// //           <li>
// //             <Link to="/customers" onClick={closeSidebar}>
// //               Customers
// //             </Link>
// //           </li>
// //           <li>
// //             <Link to="/users" onClick={closeSidebar}>
// //               Users
// //             </Link>
// //           </li>
// //           <li>
// //             <Link to="/masters" onClick={closeSidebar}>
// //               Masters
// //             </Link>
// //           </li>
// //         </ul>
// //       </aside>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import styles from "./sidebar.module.css";
// import { Link } from "react-router-dom";

// export default function Sidebar({ closeSidebar }) {
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (menu) => {
//     setOpenMenu(openMenu === menu ? null : menu);
//   };

//   return (
//     <div className={styles.sidebarOverlay} onClick={closeSidebar}>
//       <aside
//         className={styles.sidebar}
//         onClick={(e) => e.stopPropagation()}
//         role="navigation"
//         aria-label="Main navigation"
//       >
//         <button
//           className={styles.closeBtn}
//           onClick={closeSidebar}
//           aria-label="Close sidebar"
//         >
//           ✖
//         </button>

//         <ul className={styles.menuList}>
//           <li>
//             <Link to="/category" onClick={closeSidebar}>
//               Category
//             </Link>
//           </li>
//           <li>
//             <Link to="/products" onClick={closeSidebar}>
//               Products
//             </Link>
//           </li>
          
//           {/* Users Menu */}
//           <li>
//             <button
//               className={styles.menuButton}
//               onClick={() => toggleMenu("users")}
//             >
//               Users {openMenu === "users" ? "▲" : "▼"}
//             </button>
//             {openMenu === "users" && (
//               <ul className={styles.subMenuList}>
//                 <li>
//                   <Link to="/users" onClick={closeSidebar}>
//                     Users
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/role" onClick={closeSidebar}>
//                     Role
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* Masters Menu */}
//           <li>
//             <button
//               className={styles.menuButton}
//               onClick={() => toggleMenu("masters")}
//             >
//               Masters {openMenu === "masters" ? "▲" : "▼"}
//             </button>
//             {openMenu === "masters" && (
//               <ul className={styles.subMenuList}>
//                 <li>
//                   <Link to="/size" onClick={closeSidebar}>
//                     Size
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/color" onClick={closeSidebar}>
//                     Color
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/company" onClick={closeSidebar}>
//                     Company
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li>
//             <Link to="/customers" onClick={closeSidebar}>
//               Customers
//             </Link>
//           </li>
//         </ul>
//       </aside>
//     </div>
//   );
// }


import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";

export default function Sidebar({ closeSidebar }) {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={styles.sidebarOverlay} onClick={closeSidebar}>
      <aside
        className={styles.sidebar}
        onClick={(e) => e.stopPropagation()}
        role="navigation"
        aria-label="Main navigation"
      >
        <button
          className={styles.closeBtn}
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          ✖
        </button>

        <ul className={styles.menuList}>
          <li>
            <Link to="/category" onClick={closeSidebar}>
              Category
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeSidebar}>
              Products
            </Link>
          </li>

          {/* Users with submenus */}
          <li onClick={() => toggleMenu("users")} className={styles.menuItem}>
            <span>Users {openMenu === "users" ? "▲" : "▼"}</span>
            {openMenu === "users" && (
              <ul className={styles.subMenuList}>
                <li>
                  <Link to="/users" onClick={closeSidebar}>
                    Users
                  </Link>
                </li>
                <li>
                  <Link to="/role" onClick={closeSidebar}>
                    Role
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Masters with submenus */}
          <li onClick={() => toggleMenu("masters")} className={styles.menuItem}>
            <span>Masters {openMenu === "masters" ? "▲" : "▼"}</span>
            {openMenu === "masters" && (
              <ul className={styles.subMenuList}>
                <li>
                  <Link to="/size" onClick={closeSidebar}>
                    Size
                  </Link>
                </li>
                <li>
                  <Link to="/color" onClick={closeSidebar}>
                    Color
                  </Link>
                </li>
                <li>
                  <Link to="/company" onClick={closeSidebar}>
                    Company
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/customers" onClick={closeSidebar}>
              Customers
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
