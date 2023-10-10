import Navbar from "./Components/Navbar";
import styles from "./assets/style";
import { Outlet } from "react-router-dom";

const Layout = () => (
    <div className="bg-cyan-800 w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar />
            </div>
        </div>
        <div className={`${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Outlet />
            </div>
        </div>
    </div>
);
export default Layout;
