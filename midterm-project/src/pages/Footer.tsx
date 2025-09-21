
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: '40px',
        padding: '12px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#777',
        backgroundColor: 'transparent',
        borderTop: '1px solid #ddd',
      }}
    >
      <p>© {new Date().getFullYear()} Eduard King Anterola. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
