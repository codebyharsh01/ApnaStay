const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const Booking = require('../models/Booking');

const sampleProperties = [
  // ── BANGALORE ─────────────────────────────────────────────────────────────
  {
    title: 'Sunrise Student Living PG & Hostel',
    category: 'PG',
    location: 'Bangalore',
    area: 'Koramangala 5th Block',
    address: '#42, 8th Main, Near Christ University Gate, Koramangala 5th Block, Bangalore',
    price: 8500,
    deposit: 10000,
    roomType: 'Double Sharing',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    totalReviews: 34,
    amenities: ['High-speed Wi-Fi', 'Daily 3-Time Food', 'AC Room', 'Daily Housekeeping', 'CCTV 24x7', 'Washing Machine', 'RO Filter Water'],
    description: 'Premium student PG situated just 5 minutes walk from Christ University. Features spacious double and single sharing rooms with attached bathrooms, study tables, high-speed 300 Mbps Wi-Fi, and delicious hygienic North & South Indian meals included.',
    contactPerson: 'Mr. Ramesh (Property Owner)',
    whatsappNumber: '919876543210',
    isAvailable: true
  },
  {
    title: 'Silicon Hub Boys Executive PG',
    category: 'PG',
    location: 'Bangalore',
    area: 'BTM Layout 2nd Stage',
    address: 'Plot 77, 100ft Ring Road, Near Madiwala Lake, BTM Layout 2nd Stage, Bangalore',
    price: 7200,
    deposit: 10000,
    roomType: 'Single Room',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.5,
    totalReviews: 28,
    amenities: ['Wi-Fi 100 Mbps', 'Bed with Storage', 'Wardrobe', 'Power Backup', 'Bike Parking', 'Self-Cooking Kitchen'],
    description: 'Affordable semi-furnished single rooms in BTM Layout. Perfect for tech interns and college students looking for budget stay with kitchen access and high-speed internet.',
    contactPerson: 'Karthik Rao',
    whatsappNumber: '919845112233',
    isAvailable: true
  },
  {
    title: 'Urban Nest 2BHK Furnished Student Apartment',
    category: 'Flat',
    location: 'Bangalore',
    area: 'Indiranagar 100ft Road',
    address: 'Flat 302, Green Orchid Residency, Near Metro Station, Indiranagar, Bangalore',
    price: 22000,
    deposit: 35000,
    roomType: '2 BHK',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    totalReviews: 45,
    amenities: ['Air Conditioner', 'Modular Kitchen with Chimney', 'Sofa Set & Smart TV', 'High-speed Fiber', 'Covered Car/Bike Parking', 'Lift & Security'],
    description: 'Fully furnished, vibrant 2 BHK apartment in prime Indiranagar. Walking distance to Metro, top cafes, and college bus stops. Great for group of 3-4 students sharing rent.',
    contactPerson: 'Priya Nambiar',
    whatsappNumber: '919880011223',
    isAvailable: true
  },
  {
    title: 'Cozy 1BHK Semi-Furnished Flat',
    category: 'Flat',
    location: 'Bangalore',
    area: 'HSR Layout Sector 1',
    address: '2nd Floor, 14th Cross, Near NIFT College, HSR Layout Sector 1, Bangalore',
    price: 13500,
    deposit: 25000,
    roomType: '1 BHK',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.4,
    totalReviews: 14,
    amenities: ['Wardrobe Built-in', 'Kitchen Cabinet & Sink', 'Geyser', 'Covered Two-Wheeler Parking', '24 Hours Water Supply'],
    description: 'Spacious independent 1 BHK unit with balcony. Great ventilation and quiet surroundings, walking distance to NIFT Bangalore and local markets.',
    contactPerson: 'Suresh Kumar',
    whatsappNumber: '919845012345',
    isAvailable: true
  },
  {
    title: 'Spacious 3BHK Independent Student Flat',
    category: 'Flat',
    location: 'Bangalore',
    area: 'Electronic City Phase 1',
    address: 'Apt 4B, Sunrise Enclave, Neeladri Road, Electronic City Phase 1, Bangalore',
    price: 16000,
    deposit: 30000,
    roomType: '3 BHK',
    furnishedStatus: 'Unfurnished',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.3,
    totalReviews: 11,
    amenities: ['Large Balcony', '24/7 Water Supply', 'Security Guard', 'Two-Wheeler & Car Parking', 'Power Backup in Common Areas'],
    description: 'Massive unfurnished 3 BHK apartment with huge hall and 2 balconies. Customize the space to your own liking. Very economical split rent for 4-6 students studying or interning in Electronic City.',
    contactPerson: 'Manjunath Reddy',
    whatsappNumber: '919845998877',
    isAvailable: true
  },
  {
    title: 'Udupi Sri Krishna Student Mess & Tiffin',
    category: 'Mess',
    location: 'Bangalore',
    area: 'Koramangala 7th Block',
    address: '#19, 4th Cross, Near Jyoti Nivas College, Koramangala 7th Block, Bangalore',
    price: 3400,
    deposit: 500,
    roomType: 'Full Mess Service',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.7,
    totalReviews: 76,
    amenities: ['Unlimited South & North Indian Thali', 'Hot Sambar & Filter Coffee', 'Clean AC Dining Room', 'Monthly Tiffin Box Delivery Available', 'Sunday Special Sweets'],
    description: 'Authentic pure veg home-cooked student mess located right opposite Jyoti Nivas College. Rotating healthy diet menu with unlimited rice, hot rotis, dal, and fresh curries.',
    contactPerson: 'Raghavendra Bhat',
    whatsappNumber: '919845778899',
    isAvailable: true
  },

  // ── DELHI ─────────────────────────────────────────────────────────────────
  {
    title: 'Green View 2BHK Furnished Flat for Students',
    category: 'Flat',
    location: 'Delhi',
    area: 'North Campus, GTB Nagar',
    address: 'House No. 118, Hudson Lane, Near Kingsway Camp, GTB Nagar, Delhi',
    price: 18000,
    deposit: 20000,
    roomType: '2 BHK',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.6,
    totalReviews: 22,
    amenities: ['Fully Furnished Beds & Closets', 'Modular Kitchen with Gas & Fridge', 'Air Conditioner', 'Balcony View', 'Geyser', 'Washing Machine'],
    description: 'Fully furnished 2 BHK apartment ideal for 3-4 university students sharing. Located in prime student zone Hudson Lane, Delhi University North Campus. Metro station is only 400 meters away.',
    contactPerson: 'Mrs. Sunita Sharma',
    whatsappNumber: '919123456789',
    isAvailable: true
  },
  {
    title: 'Royal Girls PG & Food Facility',
    category: 'PG',
    location: 'Delhi',
    area: 'Laxmi Nagar',
    address: 'D-45, Main Vikas Marg, Opposite Metro Pillar 38, Laxmi Nagar, Delhi',
    price: 7000,
    deposit: 7000,
    roomType: 'Triple Sharing',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    totalReviews: 41,
    amenities: ['Safe & Secure Guard', 'Bio-metric Female Warden', 'Tea & Breakfast Included', 'Wi-Fi Unlimited', 'Power Backup'],
    description: 'Top-rated safe PG accommodation for female students and CA aspirants. Clean rooms, wholesome homemade food, and round-the-clock female warden support.',
    contactPerson: 'Mrs. Rekha Gupta',
    whatsappNumber: '919811223344',
    isAvailable: true
  },
  {
    title: 'Campus Edge Boys Residency PG',
    category: 'PG',
    location: 'Delhi',
    area: 'Satya Niketan (South Campus)',
    address: 'B-12, Opposite Venkateswara College, Satya Niketan, South Campus, Delhi',
    price: 8200,
    deposit: 10000,
    roomType: 'Double Sharing',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.5,
    totalReviews: 33,
    amenities: ['Attached Washroom', 'Study Desk & Bed', 'Wi-Fi Fiber', 'Geyser', 'Daily Housekeeping', 'RO Water Dispenser'],
    description: 'Popular South Campus PG right opposite Venky College. Spacious semi-furnished double sharing rooms with high-speed internet and quiet study hours.',
    contactPerson: 'Deepak Yadav',
    whatsappNumber: '919810112233',
    isAvailable: true
  },
  {
    title: 'Metro Heights 1BHK Student Flat',
    category: 'Flat',
    location: 'Delhi',
    area: 'Mukherjee Nagar',
    address: 'House 88, 3rd Floor, Near Batra Cinema, Mukherjee Nagar, Delhi',
    price: 11500,
    deposit: 15000,
    roomType: '1 BHK',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.4,
    totalReviews: 18,
    amenities: ['Bed with Mattress', 'Kitchen Shelf & Gas Connection', 'Water Purifier', 'Air Cooler', 'Separate Electricity Meter'],
    description: 'Cozy semi-furnished 1 BHK flat in Delhi coaching center Mukherjee Nagar. High ceilings, bright daylight, peaceful study environment close to top libraries.',
    contactPerson: 'Sanjay Aggarwal',
    whatsappNumber: '919818889900',
    isAvailable: true
  },
  {
    title: 'Budget 2BHK Flat for University Students',
    category: 'Flat',
    location: 'Delhi',
    area: 'Karol Bagh',
    address: 'Plot 24, Block 7, WEA, Near Metro Pillar 120, Karol Bagh, Delhi',
    price: 14000,
    deposit: 20000,
    roomType: '2 BHK',
    furnishedStatus: 'Unfurnished',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.2,
    totalReviews: 15,
    amenities: ['Spacious 2 Bedrooms', 'Wide Balcony', '24 Hours Municipal Water', 'Separate Utility Area', 'Gated Colony Security'],
    description: 'Unfurnished 2 BHK apartment in prime Karol Bagh. Easily accessible to Delhi University colleges and coaching hubs via Blue Line Metro. Affordable option for students bringing their own furniture.',
    contactPerson: 'Rajeev Kapoor',
    whatsappNumber: '919899123456',
    isAvailable: true
  },
  {
    title: 'Punjabi Tadka Student Mess & Diet Kitchen',
    category: 'Mess',
    location: 'Delhi',
    area: 'North Campus, GTB Nagar',
    address: 'Shop 12, Ground Floor, Hudson Lane Market, GTB Nagar, Delhi',
    price: 3500,
    deposit: 600,
    roomType: 'Full Mess Service',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    totalReviews: 95,
    amenities: ['Unlimited 3 Meals Daily', 'Tandoori & Phulka Rotis', 'Lassi on Weekends', 'Clean Steel Utensils', 'Custom Diet / Boiled Food on Request'],
    description: 'Home-away-from-home Punjabi style hygienic food mess. Loved by hundreds of North Campus students. Pure desi ghee tadka dal, fresh paneer, and unlimited rotis.',
    contactPerson: 'Gurmeet Singh',
    whatsappNumber: '919871234567',
    isAvailable: true
  },

  // ── KOTA ──────────────────────────────────────────────────────────────────
  {
    title: 'Annapurna Pure Veg & Non-Veg Student Mess',
    category: 'Mess',
    location: 'Kota',
    area: 'Rajeev Gandhi Nagar',
    address: 'Plot 15, Near Allen Supath Building, Rajeev Gandhi Nagar, Kota, Rajasthan',
    price: 3200,
    deposit: 500,
    roomType: 'Full Mess Service',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    totalReviews: 89,
    amenities: ['Unlimited Breakfast, Lunch & Dinner', 'Sunday Special Sweets/Chicken', 'Clean Dining Hall', 'Special Diet Menu on Request', 'Filtered Cold Water'],
    description: 'Most rated student mess service in Kota! Hygienic, home-style cooked food with minimal oil and spices. Daily rotating menu with unlimited rotis, rice, dal, and green veggies.',
    contactPerson: 'Chef Anand Prasad',
    whatsappNumber: '919988776655',
    isAvailable: true
  },
  {
    title: 'Allen Aspirants Executive Boys PG',
    category: 'PG',
    location: 'Kota',
    area: 'Landmark City',
    address: 'Building 201, Near Allen Sangyan Campus, Landmark City, Kunhari, Kota',
    price: 9800,
    deposit: 12000,
    roomType: 'Single Room',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    totalReviews: 62,
    amenities: ['Air Conditioner', 'Bio-metric In-Out Log', 'Ergonomic Study Table & Book Rack', '3 Meals + Evening Milk', 'Power Generator 24x7', 'Doctor on Call'],
    description: 'Premium study-oriented PG for JEE & NEET aspirants. Silent environment, sound-insulated windows, daily housekeeping, and high-nutrition balanced diet prepared for students.',
    contactPerson: 'Maheshwari Hostel Caretaker',
    whatsappNumber: '919414012345',
    isAvailable: true
  },
  {
    title: 'StudyPoint Double Sharing PG for Students',
    category: 'PG',
    location: 'Kota',
    area: 'Mahaveer Nagar 2',
    address: 'Plot 55-C, Near Resonance Main Building, Mahaveer Nagar 2, Kota',
    price: 6500,
    deposit: 7000,
    roomType: 'Double Sharing',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.5,
    totalReviews: 29,
    amenities: ['Individual Study Tables', 'Cooler Room', 'High Speed Wi-Fi', 'Daily Morning Cleaning', 'RO Purified Water', 'Library Access'],
    description: 'Pocket-friendly semi-furnished PG with individual beds and separate study desks for both roommates. 2 minutes walk from coaching institutes and test centers.',
    contactPerson: 'Gopal Soni',
    whatsappNumber: '919414998877',
    isAvailable: true
  },
  {
    title: 'Lakshya Fully Furnished Studio Flat',
    category: 'Flat',
    location: 'Kota',
    area: 'Vigyan Nagar',
    address: 'Flat 102, Lakshya Heights, Road No. 1, Vigyan Nagar, Kota',
    price: 10500,
    deposit: 15000,
    roomType: '1 BHK',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.6,
    totalReviews: 17,
    amenities: ['King Size Bed with Mattress', 'Split AC', 'Pantry with Induction & Kettle', 'Wardrobe', 'Balcony with City View', 'Power Backup'],
    description: 'Independent furnished 1 BHK flat for coaching students who want complete privacy and zero hostel distractions. Parents can easily visit and stay.',
    contactPerson: 'Surendra Choudhary',
    whatsappNumber: '919414223344',
    isAvailable: true
  },
  {
    title: 'Chambal Heights 2BHK Shared Flat',
    category: 'Flat',
    location: 'Kota',
    area: 'Talwandi',
    address: 'B-Block, Chambal Heights, Near Commerce College Circle, Talwandi, Kota',
    price: 12000,
    deposit: 18000,
    roomType: '2 BHK',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.4,
    totalReviews: 20,
    amenities: ['Modular Kitchen Cabinets', 'Ceiling Fans & Tube Lights', 'Curtains', 'Attached Bathrooms in Both Rooms', 'Borewell 24 Hours Water'],
    description: 'Comfortable 2 BHK flat in safe residential zone of Talwandi Kota. Easy bus transport to Allen, Vibrant, and Motion campuses.',
    contactPerson: 'Dr. Alok Verma',
    whatsappNumber: '919414445566',
    isAvailable: true
  },
  {
    title: 'Economical 2BHK Coaching Student Flat',
    category: 'Flat',
    location: 'Kota',
    area: 'Rajeev Gandhi Nagar',
    address: 'House 34, Gali No. 4, Behind City Mall, Rajeev Gandhi Nagar, Kota',
    price: 8500,
    deposit: 10000,
    roomType: '2 BHK',
    furnishedStatus: 'Unfurnished',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.1,
    totalReviews: 10,
    amenities: ['2 Bedrooms + Hall', 'Wide Balcony', 'Water Storage Tank', 'Separate Entry', 'Very Low Security Deposit'],
    description: 'Super economical unfurnished 2 BHK flat. Ideal for 3-4 students from the same coaching batch who want to set up their own budget study haven.',
    contactPerson: 'Ramnarayan Meena',
    whatsappNumber: '919414776655',
    isAvailable: true
  },

  // ── PUNE ──────────────────────────────────────────────────────────────────
  {
    title: 'Scholar Residency Luxury Boys PG',
    category: 'PG',
    location: 'Pune',
    area: 'Viman Nagar',
    address: 'Lane No. 3, Near Symbiosis Campus, Viman Nagar, Pune',
    price: 9500,
    deposit: 12000,
    roomType: 'Single Room',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.7,
    totalReviews: 19,
    amenities: ['Individual Study Desk & Ergonomic Chair', 'Personal Locker Bed', 'Gaming Room', 'Biometric Entry', 'Daily Hot Water'],
    description: 'Modern executive PG for college students and interns. Located right behind Symbiosis Centre for Management Studies. High-speed broadband, quiet environment for studies, and 24/7 security.',
    contactPerson: 'Vikram Joshi',
    whatsappNumber: '919765432109',
    isAvailable: true
  },
  {
    title: 'Sinhgad Road Budget Girls PG',
    category: 'PG',
    location: 'Pune',
    area: 'Kothrud',
    address: 'Building 14, Near MIT World Peace University, Kothrud, Pune',
    price: 6000,
    deposit: 8000,
    roomType: 'Triple Sharing',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.6,
    totalReviews: 26,
    amenities: ['Female Warden 24/7', 'Wooden Beds with Mattress', 'Wardrobes', 'Solar Hot Water', 'Wi-Fi 100 Mbps', 'Kitchen Facility'],
    description: 'Budget-friendly semi-furnished girls PG walking distance from MIT Pune and Cummins College. Safe neighborhood, gated community with CCTV, and home-like atmosphere.',
    contactPerson: 'Mrs. Anjali Kulkarni',
    whatsappNumber: '919822012345',
    isAvailable: true
  },
  {
    title: 'Silver Oak 2BHK Furnished Apartment',
    category: 'Flat',
    location: 'Pune',
    area: 'Hinjewadi Phase 1',
    address: 'Flat 504, Silver Oak Towers, Near Rajiv Gandhi Infotech Park, Hinjewadi, Pune',
    price: 19500,
    deposit: 25000,
    roomType: '2 BHK',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.8,
    totalReviews: 31,
    amenities: ['Double Beds in Both Bedrooms', 'Sofa & Coffee Table', 'Refrigerator & Washing Machine', 'Clubhouse & Gym', 'High Speed Wi-Fi'],
    description: 'Spacious furnished 2 BHK apartment inside gated society with clubhouse and swimming pool. Perfect for college interns and postgraduate students.',
    contactPerson: 'Sachin Patil',
    whatsappNumber: '919823112233',
    isAvailable: true
  },
  {
    title: 'Hillcrest 1BHK Student & Intern Flat',
    category: 'Flat',
    location: 'Pune',
    area: 'Baner',
    address: 'Flat 201, Hillcrest Residency, Near Pancard Club Road, Baner, Pune',
    price: 12500,
    deposit: 18000,
    roomType: '1 BHK',
    furnishedStatus: 'Semi-Furnished',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.5,
    totalReviews: 16,
    amenities: ['Modular Kitchen Base', 'Geyser', 'Balcony with Green View', 'Covered Bike Parking', '24x7 Water Supply'],
    description: 'Pleasant semi-furnished 1 BHK with hill view balcony in Baner. Quiet residential locality with easy access to Pune University and Balewadi High Street.',
    contactPerson: 'Manoj Shinde',
    whatsappNumber: '919822998877',
    isAvailable: true
  },
  {
    title: 'Greenfield 3BHK Independent Student Flat',
    category: 'Flat',
    location: 'Pune',
    area: 'Shivaji Nagar',
    address: 'Bunglow No. 8, Greenfield Society, Model Colony, Shivaji Nagar, Pune',
    price: 17000,
    deposit: 25000,
    roomType: '3 BHK',
    furnishedStatus: 'Unfurnished',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.4,
    totalReviews: 21,
    amenities: ['Large 3 Bedrooms', 'Private Terrace', 'Covered Car & Bike Parking', 'Lush Green Courtyard', 'Close to Metro Station'],
    description: 'Unfurnished 3 BHK portion of bungalow in prestigious Model Colony, Shivaji Nagar. Minutes away from COEP Tech, Ferguson College, and BMCC.',
    contactPerson: 'Aditya Deshmukh',
    whatsappNumber: '919822334455',
    isAvailable: true
  },
  {
    title: 'Maharashtrian & North Indian Student Bhojnalaya',
    category: 'Mess',
    location: 'Pune',
    area: 'FC Road, Shivaji Nagar',
    address: 'Shop 5, Ground Floor, Lane Behind Ferguson College Main Gate, FC Road, Pune',
    price: 3000,
    deposit: 500,
    roomType: 'Full Mess Service',
    furnishedStatus: 'Furnished',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80'
    ],
    rating: 4.9,
    totalReviews: 110,
    amenities: ['Unlimited Chapati & Bhakri', 'Special Puran Poli on Festivals', 'Daily Fresh Vegetables', 'Clean Seating Area', 'Hygienic Steel Thali'],
    description: 'Famous student mess on FC Road feeding college students for over 8 years. Wholesome home-style cooked food, unlimited servings, and affordable monthly coupon system.',
    contactPerson: 'Shantaram Jadhav',
    whatsappNumber: '919822445566',
    isAvailable: true
  }
];

// POST /api/seed - Re-seed database with default properties and sample booking
router.post('/', async (req, res) => {
  try {
    await Property.deleteMany({});
    await Booking.deleteMany({});

    const createdProperties = await Property.insertMany(sampleProperties);

    // Create a sample booking for testing
    const sampleBooking = await Booking.create({
      propertyId: createdProperties[0]._id,
      propertyTitle: createdProperties[0].title,
      studentName: 'Aarav Patel',
      studentPhone: '919876543210',
      studentEmail: 'aarav.patel@student.edu',
      moveInDate: '2026-09-01',
      durationMonths: 6,
      status: 'Pending',
      notes: 'Looking for a quiet room on the upper floor.'
    });

    res.json({
      success: true,
      message: 'Database seeded successfully with expanded 24 properties across Bangalore, Delhi, Kota, Pune!',
      propertiesCount: createdProperties.length,
      sampleBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
