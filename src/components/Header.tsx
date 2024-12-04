import { BellIcon } from '@heroicons/react/24/outline';
import UserProfileDropdown from './UserProfileDropdown';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
           
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
            <UserProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}