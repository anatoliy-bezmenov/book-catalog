import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show footer when the user scrolls to bottom of the page
      if (scrollPosition >= documentHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initially check if the page is tall enough to scroll, if not, show the footer by default
    if (document.documentElement.scrollHeight <= window.innerHeight) {
      setIsVisible(true); // Make footer visible if no scrolling is needed
    }

    const resetFooter = () => {
      if (document.documentElement.scrollHeight <= window.innerHeight) {
        setIsVisible(true); // Visible if no scroll
      } else {
        setIsVisible(false); // Otherwise hide footer
      }
    };

    window.addEventListener("scroll", handleScroll);
    resetFooter(); // Reset the footer visibility on page load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return (
    <footer
      className={`w-full text-center text-2xl bg-gradient-to-b from-[#1C1C1E] to-[#6C5B7B] text-white py-6 fixed bottom-0 left-0 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div className="mx-auto w-[275px] flex justify-center">
        Book Catalog 2025
      </div>
    </footer>
  );
};

export default Footer;