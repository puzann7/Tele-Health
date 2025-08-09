mport express from 'express';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

// @route   GET /api/doctors
// @desc    Get all doctors with advanced filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      specialization,
      province,
      district,
      municipality,
      isOnline,
      language,
      minRating = 0,
      maxFee,
      consultationType = 'video',
      availableNow = false,
      sortBy = 'averageRating',
      sortOrder = 'desc',
      page = 1,
      limit = 12,
      search
    } = req.query;

    // Build doctor filter
    const doctorFilter = {
      verificationStatus: 'verified'
    };

    if (specialization) {
      doctorFilter.$or = [
        { primarySpecialization: specialization },
        { secondarySpecializations: { $in: [specialization] } }
      ];
    }

    if (isOnline !== undefined) {
      doctorFilter.isOnline = isOnline === 'true';
    }

    if (minRating > 0) {
      doctorFilter.averageRating = { $gte: parseFloat(minRating) };
    }

    if (maxFee) {
      doctorFilter[`consultationFee.${consultationType}`] = { $lte: parseInt(maxFee) };
    }

    if (language) {
      doctorFilter.languagesSpoken = { $in: [language] };
    }

    if (availableNow === 'true') {
      doctorFilter.isOnline = true;
      // Add logic for current day/time availability
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
      const currentTime = now.toTimeString().slice(0, 5);

      doctorFilter[`availability.${currentDay}.available`] = true;
    }

    // Build user filter for location and search
    const userFilter = {
      userType: 'doctor',
      isActive: true
    };

    if (province) userFilter['address.province'] = province;
    if (district) userFilter['address.district'] = district;
    if (municipality) userFilter['address.municipality'] = municipality;

    if (search) {
      userFilter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Aggregate query to join and filter
    const doctors = await Doctor.aggregate([
      { $match: doctorFilter },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      { $match: { 'user.userType': 'doctor', 'user.isActive': true, ...userFilter } },
      { $sort: { [sortBy]: sortDirection } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $project: {
          _id: 1,
          userId: 1,
          primarySpecialization: 1,
          secondarySpecializations: 1,
          totalExperience: 1,
          consultationFee: 1,
          averageRating: 1,
          totalReviews: 1,
          totalConsultations: 1,
          isOnline: 1,
          languagesSpoken: 1,
          bio: 1,
          availability: 1,
          verificationStatus: 1,
          'user.firstName': 1,
          'user.lastName': 1,
          'user.profilePicture': 1,
          'user.address': 1,
          currentWorkplace: 1
        }
      }
    ]);

    // Get total count for pagination
    const totalDoctors = await Doctor.countDocuments(doctorFilter);

    res.json({
      status: 'success',
      results: doctors.length,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalDoctors / parseInt(limit)),
        totalDoctors,
        hasNext: skip + doctors.length < totalDoctors,
        hasPrev: parseInt(page) > 1
      },
      data: {
        doctors
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching doctors',
      error: error.message
    });
  }
});

// @route   GET /api/doctors/:doctorId
// @desc    Get specific doctor details
// @access  Public
router.get('/:doctorId', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
      .populate('userId', 'firstName lastName profilePicture address phoneNumber email');

    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        doctor
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching doctor details',
      error: error.message
    });
  }
});

// @route   PATCH /api/doctors/profile
// @desc    Update doctor profile (doctor only)
// @access  Private (Doctor)
router.patch('/profile', protect, restrictTo('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor profile not found'
      });
    }

    // Fields that doctors can update
    const allowedFields = [
      'bio', 'consultationFee', 'availability', 'languagesSpoken',
      'specialistIn', 'availableForEmergency', 'emergencyContactNumber',
      'currentWorkplace', 'certifications'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    Object.assign(doctor, updates);
    await doctor.save();

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        doctor
      }
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// @route   PATCH /api/doctors/toggle-online
// @desc    Toggle doctor online status
// @access  Private (Doctor)
router.patch('/toggle-online', protect, restrictTo('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor profile not found'
      });
    }

    doctor.isOnline = !doctor.isOnline;
    doctor.lastSeen = new Date();
    await doctor.save();

    res.json({
      status: 'success',
      message: `Status updated to ${doctor.isOnline ? 'online' : 'offline'}`,
      data: {
        isOnline: doctor.isOnline,
        lastSeen: doctor.lastSeen
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating online status',
      error: error.message
    });
  }
});

// @route   GET /api/doctors/my/dashboard
// @desc    Get doctor dashboard data
// @access  Private (Doctor)
router.get('/my/dashboard', protect, restrictTo('doctor'), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.id });

    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor profile not found'
      });
    }

    // Get appointment statistics
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const { default: Appointment } = await import('../models/Appointment.js');

    const [
      todayAppointments,
      upcomingAppointments,
      totalEarnings,
      monthlyStats
    ] = await Promise.all([
      Appointment.countDocuments({
        doctorId: req.user.id,
        scheduledDateTime: { $gte: startOfDay, $lte: endOfDay },
        status: { $in: ['scheduled', 'confirmed', 'completed'] }
      }),

      Appointment.find({
        doctorId: req.user.id,
        scheduledDateTime: { $gte: new Date() },
        status: { $in: ['scheduled', 'confirmed'] }
      }).limit(5).populate('patientId', 'firstName lastName profilePicture'),

      Appointment.aggregate([
        {
          $match: {
            doctorId: new mongoose.Types.ObjectId(req.user.id),
            status: 'completed',
            paymentStatus: 'released'
          }
        },
        {
          $group: {
            _id: null,
            totalEarnings: { $sum: '$consultationFee' }
          }
        }
      ]),

      Appointment.aggregate([
        {
          $match: {
            doctorId: new mongoose.Types.ObjectId(req.user.id),
            createdAt: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          }
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    res.json({
      status: 'success',
      data: {
        doctor: {
          ...doctor.toObject(),
          user: req.user
        },
        stats: {
          todayAppointments,
          totalConsultations: doctor.totalConsultations,
          averageRating: doctor.averageRating,
          totalReviews: doctor.totalReviews,
          totalEarnings: totalEarnings[0]?.totalEarnings || 0
        },
        upcomingAppointments,
        monthlyStats
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

export default router;
