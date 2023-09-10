import { Link } from 'react-router-dom';

function Main() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
            <header className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white text-2xl font-semibold">Dabuti</Link>
                    <div className="space-x-4">
                        <Link to="/auth/login" className="text-white">Log in</Link>
                        <Link to="/auth/register" className="text-white">Register</Link>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Main;
