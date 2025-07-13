import { useState } from "react";
import { Link } from "react-router-dom";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { FiAlignLeft } from "react-icons/fi";
import Togglesidebar from "../components/Togglesidebar";

const Navbar = () => {
  const [mode, setMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMode = () => {
    setMode((prev) => !prev);
  };

  return (
    <>
      <nav className="bg-blue-600 text-white decoration-0 p-3 flex justify-between items-center">
        <button
          className="text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FiAlignLeft />
        </button>

        <div>
          <button
            onClick={handleMode}
            className="w-12 h-12 flex items-center justify-center 
             bg-white text-black text-2xl rounded-full 
             transition-all duration-300 ease-in-out 
             hover:scale-110 hover:shadow-md active:scale-95 
             dark:bg-gray-800 dark:text-white"
          >
            <span
              className={`inline-block transition-transform duration-500 ease-in-out ${
                mode ? "rotate-0" : "rotate-180"
              }`}
            >
              {mode ? <MdLightMode /> : <MdOutlineLightMode />}
            </span>
          </button>
        </div>
      </nav>
      {isOpen && <Togglesidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Navbar;
