import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 py-6 ">
      <div className="text-center text-white">
        <p>&copy; {currentYear} MyCompany. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
