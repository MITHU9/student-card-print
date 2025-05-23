import { Link } from "react-router-dom";
import useTotalStudents from "./hooks/useTotalStudents";

function App() {
  const [data] = useTotalStudents();

  return (
    <div
      style={{ backgroundImage: "url('/pust.jpg')" }}
      className="bg-cover bg-no-repeat bg-center min-h-screen"
    >
      <div className="container mx-auto">
        <header>
          <nav>
            <ul className="flex justify-center gap-5 py-5">
              <Link
                to="/home/card-print"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Print Card
              </Link>
              <Link
                to="/add-student"
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Student
              </Link>
            </ul>
          </nav>
        </header>
        <main className="mt-5">
          <div className="flex items-center gap-3">
            <div className=" px-4 h-28 bg-amber-700 flex items-center justify-center hover:bg-amber-800">
              <h2 className="text-2xl font-semibold text-gray-200">
                Total Students: {data}
              </h2>
            </div>
            <div className="px-6 h-28 bg-red-800 flex items-center justify-center hover:bg-red-900">
              <h2 className="text-2xl font-semibold text-gray-200">
                Total Card Print:0
              </h2>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
