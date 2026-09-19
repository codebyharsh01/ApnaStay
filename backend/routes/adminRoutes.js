const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Booking = require("../models/Booking");
const Property = require("../models/Property");
const User = require("../models/User");

// Helper function to seed/ensure harsh admin into MongoDB database
async function seedDefaultAdminIfNeeded() {
  try {
    await Admin.deleteMany({ username: "abhishek" });
    let admin = await Admin.findOne({ username: "harsh" });
    if (!admin) {
      console.log("🌱 Seeding Admin user (harsh) into MongoDB database...");
      await Admin.create({
        username: "harsh",
        email: "harsh@apnastay.in",
        password: "harsh123",
        name: "Harsh (Admin)",
        role: "Super Admin",
      });
      console.log(
        "✅ Admin account created in MongoDB! Username: harsh | Password: harsh123",
      );
    } else {
      admin.email = "harsh@apnastay.in";
      if (admin.password !== "harsh123") {
        admin.password = "harsh123";
      }
      await admin.save();
      console.log("✅ Admin account synced with ApnaStay credentials");
    }
  } catch (err) {
    console.error("Error seeding admin user:", err.message);
  }
}

// Call seed check on route initialization
seedDefaultAdminIfNeeded();

// @route   POST /api/admin/login
// @desc    Authenticate admin user against MongoDB database
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username / Email and Password are required.",
      });
    }

    // Ensure database contains at least one admin
    await seedDefaultAdminIfNeeded();

    const normalizedIdentifier = username.trim().toLowerCase();

    // Query MongoDB Atlas for matching admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { username: normalizedIdentifier },
        { email: normalizedIdentifier },
      ],
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid Admin username or email.",
      });
    }

    // Verify password
    if (admin.password !== password.trim()) {
      return res.status(401).json({
        success: false,
        message: "Invalid password. Please check your credentials.",
      });
    }

    // Return success response with token & admin details
    return res.json({
      success: true,
      message: "Admin authenticated successfully",
      token: `apnastay_admin_token_${admin._id}`,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during admin login: " + error.message,
    });
  }
});

// @route   GET /api/admin/seed
// @desc    Force seed / reset default admin in database
// @access  Public
router.get("/seed", async (req, res) => {
  try {
    let admin = await Admin.findOne({ username: "admin" });
    if (!admin) {
      admin = await Admin.create({
        username: "admin",
        email: "admin@apnastay.in",
        password: "admin123",
        name: "ApnaStay Admin",
        role: "Super Admin",
      });
    }
    return res.json({
      success: true,
      message: "Admin account verified in MongoDB database",
      admin: {
        username: admin.username,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/admin/overview
// @desc    Return admin dashboard totals and booking intelligence
// @access  Admin UI
router.get("/overview", async (req, res) => {
  try {
    const [users, bookings, properties] = await Promise.all([
      User.find({}, "-password").sort({ createdAt: -1 }).lean(),
      Booking.find({}).sort({ createdAt: -1 }).lean(),
      Property.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    const bookingStats = bookings.reduce(
      (stats, booking) => {
        stats.total += 1;
        if (booking.status === "Confirmed") stats.confirmed += 1;
        if (booking.status === "Pending") stats.pending += 1;
        if (booking.status === "Rejected") stats.rejected += 1;
        return stats;
      },
      { total: 0, confirmed: 0, pending: 0, rejected: 0 },
    );

    const propertyStats = properties
      .map((property) => {
        const propertyBookings = bookings.filter(
          (booking) => String(booking.propertyId) === String(property._id),
        );

        return {
          _id: property._id,
          title: property.title,
          category: property.category,
          location: property.location,
          price: property.price,
          isAvailable: property.isAvailable,
          bookingCount: propertyBookings.length,
          confirmedBookings: propertyBookings.filter(
            (booking) => booking.status === "Confirmed",
          ).length,
          pendingBookings: propertyBookings.filter(
            (booking) => booking.status === "Pending",
          ).length,
        };
      })
      .sort((a, b) => b.bookingCount - a.bookingCount);

    const userStats = users.map((user) => {
      const userBookings = bookings.filter(
        (booking) =>
          (booking.userId && String(booking.userId) === String(user._id)) ||
          (booking.studentEmail && booking.studentEmail === user.email),
      );
      const propertyIds = new Set(
        userBookings.map((booking) => String(booking.propertyId)),
      );

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        totalBookings: userBookings.length,
        propertiesBooked: propertyIds.size,
        confirmedBookings: userBookings.filter(
          (booking) => booking.status === "Confirmed",
        ).length,
        pendingBookings: userBookings.filter(
          (booking) => booking.status === "Pending",
        ).length,
        rejectedBookings: userBookings.filter(
          (booking) => booking.status === "Rejected",
        ).length,
        latestBooking: userBookings[0] || null,
      };
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalUsers: users.length,
          totalProperties: properties.length,
          bookedProperties: propertyStats.filter(
            (property) => property.bookingCount > 0,
          ).length,
          ...bookingStats,
        },
        users: userStats,
        properties: propertyStats,
        recentBookings: bookings.slice(0, 10),
      },
    });
  } catch (error) {
    console.error("Admin Overview Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
