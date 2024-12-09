// components/Sidebar.tsx
// import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <div className="w-64 bg-gray-900 p-5 fixed md:relative md:h-auto md:w-auto md:bg-transparent">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li>
            {/* <Link href="/"> */}
            <a className="block py-2 px-4 hover:bg-gray-700">Home</a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/about"> */}
            <a className="block py-2 px-4 hover:bg-gray-700">About</a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/services"> */}
            <a className="block py-2 px-4 hover:bg-gray-700">Services</a>
            {/* </Link> */}
          </li>
          <li>
            {/* <Link href="/contact"> */}
            <a className="block py-2 px-4 hover:bg-gray-700">Contact</a>
            {/* </Link> */}
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6 ml-64 md:ml-0">
        {/* Main content area */}
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

export default Sidebar;
