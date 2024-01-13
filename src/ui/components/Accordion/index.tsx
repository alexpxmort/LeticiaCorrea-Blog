// Accordion.tsx
import React, { useState, ReactNode } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default Accordion;
