import React from 'react';
import { ShieldAlert } from 'lucide-react';

const MaintenanceAlert = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <div className="flex">
        <div className="py-1">
          <ShieldAlert className="h-6 w-6 text-red-500 mr-4" />
        </div>
        <div>
          <p className="font-bold">Maintenance Required</p>
          <ul className="list-disc pl-5 mt-2">
            {items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceAlert;
