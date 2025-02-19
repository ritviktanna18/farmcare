import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

const EQUIPMENT_LIST = [
  {
    id: 1,
    name: "John Deere 5045D Tractor",
    type: "Tractor",
    location: "Guntur, Andhra Pradesh",
    specs: {
      power: "45 HP",
      condition: "Excellent",
      year: 2022
    },
    pricePerDay: 2500,
    features: ["Power Steering", "4WD", "Diesel Engine", "PTO"],
    availability: "Immediately",
    ownerName: "Ramesh Kumar",
    phone: "+91 9876543210",
    email: "ramesh.k@email.com",
    minDays: 1,
    maxDays: 30
  },
  {
    id: 2,
    name: "Mahindra 575 DI Tractor",
    type: "Tractor",
    location: "Warangal, Telangana",
    specs: {
      power: "47 HP",
      condition: "Good",
      year: 2021
    },
    pricePerDay: 2200,
    features: ["Power Steering", "2WD", "Diesel Engine", "Dual Clutch"],
    availability: "From next week",
    ownerName: "Suresh Reddy",
    phone: "+91 9876543211",
    email: "suresh.r@email.com",
    minDays: 2,
    maxDays: 45
  },
  {
    id: 3,
    name: "Kubota DC-70 Combine Harvester",
    type: "Harvester",
    location: "Krishna District, Andhra Pradesh",
    specs: {
      power: "70 HP",
      condition: "Excellent",
      year: 2023
    },
    pricePerDay: 5000,
    features: ["Track Type", "Grain Tank", "Auto Steering", "GPS"],
    availability: "Next month",
    ownerName: "Venkat Rao",
    phone: "+91 9876543212",
    email: "venkat.r@email.com",
    minDays: 3,
    maxDays: 15
  },
  {
    id: 4,
    name: "Rotavator Set",
    type: "Tillage Equipment",
    location: "Rangareddy, Telangana",
    specs: {
      width: "7 feet",
      condition: "Good",
      year: 2023
    },
    pricePerDay: 1200,
    features: ["Heavy Duty Blades", "Adjustable Depth", "Compatible with all tractors", "With Cage Wheels"],
    availability: "Immediately",
    ownerName: "Krishna Murthy",
    phone: "+91 9876543213",
    email: "krishna.m@email.com",
    minDays: 1,
    maxDays: 20
  },
  {
    id: 5,
    name: "Crop Sprayer Equipment",
    type: "Spraying Equipment",
    location: "East Godavari, Andhra Pradesh",
    specs: {
      capacity: "500L",
      condition: "Excellent",
      year: 2023
    },
    pricePerDay: 1500,
    features: ["High Pressure Pump", "Wide Coverage", "Multiple Nozzles", "Digital Control"],
    availability: "From next week",
    ownerName: "Prasad Reddy",
    phone: "+91 9876543214",
    email: "prasad.r@email.com",
    minDays: 1,
    maxDays: 10
  }
];

const equipmentTypes = [
  'All Types',
  'Tractor',
  'Harvester',
  'Tillage Equipment',
  'Spraying Equipment',
  'Seeding Equipment'
];

const locations = [
  'All Locations',
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu'
];

const EquipmentCard = ({ equipment }) => {
  const [showContact, setShowContact] = useState(false);
  const [rentDays, setRentDays] = useState(equipment.minDays);
  const [totalPrice, setTotalPrice] = useState(equipment.pricePerDay * equipment.minDays);

  const handleDaysChange = (e) => {
    const days = Math.min(Math.max(equipment.minDays, parseInt(e.target.value)), equipment.maxDays);
    setRentDays(days);
    setTotalPrice(days * equipment.pricePerDay);
  };

  const handleRentRequest = () => {
    toast.success(`Rental request sent for ${rentDays} days. Total: ₹${totalPrice.toLocaleString('en-IN')}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-900/40 rounded-lg p-6 ring-1 ring-green-800/50"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-green-300">{equipment.name}</h3>
          <p className="text-green-50">{equipment.location}</p>
        </div>
        <button
          onClick={() => {
            navigator.share({
              title: `Rent ${equipment.name}`,
              text: `Check out this ${equipment.type} for rent in ${equipment.location}`,
              url: window.location.href
            }).catch(() => {
              toast.success('Link copied to clipboard!');
            });
          }}
          className="p-2 hover:bg-green-800/30 rounded-full transition-colors"
        >
          Share
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-green-200">
          <span>Power/Size: {equipment.specs.power || equipment.specs.width || equipment.specs.capacity}</span>
        </div>
        <div className="flex items-center text-green-200">
          <span>Condition: {equipment.specs.condition}</span>
        </div>
        <div className="flex items-center text-green-200">
          <span>Year: {equipment.specs.year}</span>
        </div>
        <div className="flex items-center text-green-200">
          <span>{equipment.availability}</span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-green-300 font-medium mb-2">Features:</h4>
        <div className="grid grid-cols-2 gap-2">
          {equipment.features.map((feature, index) => (
            <div key={index} className="text-green-200 text-sm">
              • {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-800/30 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-green-200">Daily Rental Rate:</span>
          <span className="text-xl font-semibold text-green-300">
            ₹{equipment.pricePerDay.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-green-300 mb-2">Number of Days:</label>
          <input
            type="number"
            min={equipment.minDays}
            max={equipment.maxDays}
            value={rentDays}
            onChange={handleDaysChange}
            className="w-full px-3 py-2 bg-green-900/40 border border-green-700 rounded-lg text-green-100"
          />
          <p className="text-sm text-green-400 mt-1">
            Min: {equipment.minDays} days | Max: {equipment.maxDays} days
          </p>
        </div>

        <div className="flex justify-between items-center text-green-200 mb-4">
          <span>Total Amount:</span>
          <span className="text-xl font-bold text-green-300">
            ₹{totalPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        <button
          onClick={() => setShowContact(!showContact)}
          className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg transition-colors"
        >
          {showContact ? 'Hide Contact' : 'Show Contact Details'}
        </button>

        <button
          onClick={handleRentRequest}
          className="w-full bg-green-900/50 hover:bg-green-800 text-green-300 py-2 rounded-lg transition-colors ring-1 ring-green-700"
        >
          Send Rental Request
        </button>
      </div>

      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-green-800/30 rounded-lg p-4 overflow-hidden"
          >
            <div className="space-y-2">
              <div className="text-green-200">
                Owner: {equipment.ownerName}
              </div>
              <div className="text-green-200">
                Phone: {equipment.phone}
              </div>
              <div className="text-green-200">
                Email: {equipment.email}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EquipmentLease = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const filteredEquipment = EQUIPMENT_LIST.filter(equipment => {
    const matchesSearch = !searchQuery || 
      equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.type.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesType = selectedType === 'All Types' ||
      equipment.type === selectedType;

    const matchesLocation = selectedLocation === 'All Locations' ||
      equipment.location.includes(selectedLocation);

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" richColors closeButton />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-300 mb-2">Agricultural Equipment Rental</h1>
          <p className="text-green-200">Rent farming equipment and machinery for your needs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100 placeholder-green-500"
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100"
          >
            {equipmentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 bg-green-900/40 rounded-lg border border-green-700 text-green-100"
          >
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredEquipment.map((equipment) => (
            <EquipmentCard key={equipment.id} equipment={equipment} />
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-green-400">
            <p>No equipment found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentLease;