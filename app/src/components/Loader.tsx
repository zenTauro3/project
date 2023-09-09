function Loader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
}

export default Loader;
