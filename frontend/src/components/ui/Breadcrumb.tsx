import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {/* Home Icon */}
      <Link 
        to="/" 
        className="flex items-center text-secondary-500 hover:text-primary-600 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {/* Separator */}
          <ChevronRight className="w-4 h-4 text-secondary-400" />
          
          {/* Breadcrumb Item */}
          {item.href && !item.isActive ? (
            <Link
              to={item.href}
              className="text-secondary-600 hover:text-primary-600 transition-colors truncate max-w-[200px]"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`truncate max-w-[200px] ${
                item.isActive 
                  ? 'text-secondary-900 font-medium' 
                  : 'text-secondary-600'
              }`}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 