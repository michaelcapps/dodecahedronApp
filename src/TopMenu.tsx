import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
}

interface HamburgerMenuProps {
  items?: MenuItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

const defaultMenuItems: MenuItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' }
];

const TopMenu = ({
  items = defaultMenuItems,
  onNavigate,
  className = ''
}: HamburgerMenuProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNavigation = (path: string): void => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      // Default navigation behavior
      console.log(`Navigating to: ${path}`);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="rounded-md bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMenu;