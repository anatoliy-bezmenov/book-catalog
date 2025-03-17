import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    if (document.documentElement.scrollHeight <= window.innerHeight) {
      setIsVisible(true);
    }

    const resetFooter = () => {
      if (document.documentElement.scrollHeight <= window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    resetFooter();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <footer
      className={`w-full text-center text-2xl bg-gradient-to-b from-[#1C1C1E] to-[#6C5B7B] text-white py-6 
      fixed bottom-0 left-0 transition-opacity duration-300 ${isVisible ? 
      "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="mx-auto w-[275px] flex justify-center">
        Book Catalog 2025
      </div>
    </footer>

  );
};

export default Footer;