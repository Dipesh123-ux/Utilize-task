import React, { useContext } from 'react';
import Context from '../context/createContext';

const Header = () => {
    const { user, setUser } = useContext(Context);

    const handleLogout = () => {
        setUser(null);

        window.location.href = 'http://localhost:8080/auth/logout';
    };

    return (
        <header className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Login to view orders</h1>
                {user ? (
                    <div className="flex flex-row items-center">
                        <p>Welcome, {user.displayName}!</p>
                        <button
                            className="bg-white text-blue-500 px-4 py-2 mx-2 rounded-full hover:bg-blue-100"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <a
                        href="http://localhost:8080/auth/google"
                        className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100"
                    >
                        Login with Google
                    </a>
                )}
            </div>
        </header>
    );
};

export default Header;
