import { Outlet } from 'react-router-dom';
import Header from '../Components/GlobalComponents/Header';
import Footer from '../Components/GlobalComponents/Footer';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col font-poppins">
            <Header />
            <main className="flex-1 py-4 px-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
