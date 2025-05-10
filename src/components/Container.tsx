import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-gray-900 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 rounded-xl border border-gray-800">
      {children}
    </div>
  );
};