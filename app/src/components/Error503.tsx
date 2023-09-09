function Error503() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="bg-white p-8 rounded shadow-md text-center">
                <h1 className="text-4xl font-bold">503 - Service Unavailable</h1>
                <p className="mt-2 text-lg">Sorry, the service is currently unavailable.</p>
                <p className="mt-4">Please try again later.</p>
            </div>
        </div>
    );
}

export default Error503;
