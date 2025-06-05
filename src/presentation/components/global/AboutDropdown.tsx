import Link from "next/link";
import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

interface AboutDropdownProps {
  onAboutClick: () => void;
}

const AboutDropdown: React.FC<AboutDropdownProps> = ({ onAboutClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        className="flex cursor-pointer items-center gap-2 font-medium text-gray-300 transition-all hover:text-[var(--cta-two-hover)]"
        onClick={onAboutClick}
      >
        About <BiChevronDown />
      </a>
      {isHovered && (
        <div className="absolute left-0 w-48 rounded-md bg-[var(--bg-two)] shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
              href="/overview"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-gray-300 transition-all hover:text-[var(--cta-two-hover)]"
            >
              Overview
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutDropdown;
