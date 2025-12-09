import { useState, useEffect } from 'react';

// --- Mock Data ---
const MOCK_RESOURCES = [
  {
    id: 'res-001',
    name: 'Electron Microscope X2',
    category: 'Lab Equipment',
    usageCount: 155, // High usage
    maintenanceThreshold: 150,
    peakHours: [10, 11, 14, 15], // 24h format
    lastMaintenanceDate: '2023-10-15',
    alternatives: ['res-003', 'res-005']
  },
  {
    id: 'res-002',
    name: 'VR Headset Set A',
    category: 'VR Lab',
    usageCount: 45,
    maintenanceThreshold: 100,
    peakHours: [13, 16],
    lastMaintenanceDate: '2023-11-20',
    alternatives: ['res-004']
  },
  {
    id: 'res-003',
    name: 'Digital Microscope Std',
    category: 'Lab Equipment',
    usageCount: 20,
    maintenanceThreshold: 200,
    peakHours: [9],
    lastMaintenanceDate: '2023-12-01',
    alternatives: []
  },
  // ... more items
];

const useUsageOptimizer = () => {
  const [resources, setResources] = useState([]);
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [stats, setStats] = useState({ totalUsage: 0, activeCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API Fetch
    setTimeout(() => {
      const processedData = MOCK_RESOURCES.map(item => {
        // Logic: Auto-mark maintenance if usage > threshold
        const needsMaintenance = item.usageCount >= item.maintenanceThreshold;
        return { ...item, maintenanceNeeded: needsMaintenance };
      });

      setResources(processedData);

      // Derived State
      setMaintenanceList(processedData.filter(r => r.maintenanceNeeded));
      setStats({
        totalUsage: processedData.reduce((acc, curr) => acc + curr.usageCount, 0),
        activeCount: processedData.length
      });
      setLoading(false);
    }, 500);
  }, []);

  // Logic: Find specific alternative object details
  const getAlternativesFor = (resourceId) => {
    const resource = resources.find(r => r.id === resourceId);
    if (!resource || !resource.alternatives) return [];
    
    return resources.filter(r => resource.alternatives.includes(r.id));
  };

  return {
    resources,
    maintenanceList,
    stats,
    getAlternativesFor
  };
};

export default useUsageOptimizer;
export { MOCK_RESOURCES };