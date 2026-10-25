const EventMedia = require('../models/EventMedia');
const Event = require('../models/Event');

// Curated authentic school photos directly from project assets
const curatedPhotos = [
  // Classroom & Teaching
  { path: 'assets/images/classroom/classroom-1.png', cat: 'classroom', title: 'Interactive Classroom Session' },
  { path: 'assets/images/classroom/classroom-2.png', cat: 'classroom', title: 'Curriculum Discussion & Engagement' },
  { path: 'assets/images/classroom/classroom-3.png', cat: 'classroom', title: 'Student Collaboration in Class' },
  { path: 'assets/images/classroom/classroom-4.png', cat: 'classroom', title: 'Primary Teaching Pedagogy' },
  { path: 'assets/images/classroom/classroom-5.png', cat: 'classroom', title: 'Active Learner Participation' },
  { path: 'assets/images/classroom/classroom-6.png', cat: 'classroom', title: 'Faculty Guidance & Mentorship' },
  { path: 'assets/images/classroom/classroom-7.png', cat: 'classroom', title: 'Reading & Writing Practical Class' },

  // Computer Lab & Activities
  { path: 'assets/images/activity/activity-11.png', cat: 'activity', title: 'Students Enjoying Computer Practicals (2023)' },
  { path: 'assets/images/activity/activity-1.png', cat: 'activity', title: 'Morning Assembly & Campus Gathering' },
  { path: 'assets/images/activity/activity-2.png', cat: 'activity', title: 'Student Co-Curricular Presentations' },
  { path: 'assets/images/activity/activity-3.png', cat: 'activity', title: 'School Community Celebrations' },
  { path: 'assets/images/activity/activity-4.png', cat: 'activity', title: 'Cultural Dance & Drama Recital' },
  { path: 'assets/images/activity/activity-5.png', cat: 'activity', title: 'Student Recognition & Speeches' },
  { path: 'assets/images/activity/activity-6.png', cat: 'activity', title: 'Art & Craft Exhibition' },
  { path: 'assets/images/activity/activity-7.png', cat: 'activity', title: 'Group Learning & Social Activities' },
  { path: 'assets/images/activity/activity-8.png', cat: 'activity', title: 'Student Projects Showcase' },
  { path: 'assets/images/activity/activity-9.png', cat: 'activity', title: 'Independence Day Assembly' },
  { path: 'assets/images/activity/activity-10.png', cat: 'activity', title: 'Campus Leadership Exercises' },

  // Sports & Athletics
  { path: 'assets/images/sports/sports-1.png', cat: 'sports', title: 'Annual Sports Meet - Track Events' },
  { path: 'assets/images/sports/sports-2.png', cat: 'sports', title: 'Athletics & Running Competitions' },
  { path: 'assets/images/sports/sports-3.png', cat: 'sports', title: 'School Sprint Races' },
  { path: 'assets/images/sports/sports-4.png', cat: 'sports', title: 'Volleyball & Court Practice' },
  { path: 'assets/images/sports/sports-5.png', cat: 'sports', title: 'Cricket Practice & Field Drills' },
  { path: 'assets/images/sports/sports-6.png', cat: 'sports', title: 'Kabaddi Matches & Team Sports' },
  { path: 'assets/images/sports/sports-7.png', cat: 'sports', title: 'School Sports Day Ceremony' },
  { path: 'assets/images/sports/sports-8.png', cat: 'sports', title: 'Student Athletes on the Field' },
  { path: 'assets/images/sports/sports-9.png', cat: 'sports', title: 'Team Sportsmanship & Warm-ups' },
  { path: 'assets/images/sports/sports-10.png', cat: 'sports', title: 'Inter-House Sports Competitions' },
  { path: 'assets/images/sports/sports-11.png', cat: 'sports', title: 'Physical Education Drills' },
  { path: 'assets/images/sports/sports-12.png', cat: 'sports', title: 'Track Race Finalists' },
  { path: 'assets/images/sports/sports-13.png', cat: 'sports', title: 'Sports Prize Distribution Moments' },
  { path: 'assets/images/sports/sports-14.png', cat: 'sports', title: 'Athletic Champions Celebrating' },

  // Music & Cultural
  { path: 'assets/images/music/music-1.png', cat: 'music', title: 'Music Lessons & Instrument Practice' },

  // Outdoor & Ceremonies
  { path: 'assets/images/outdoor/outdoor-1.png', cat: 'outdoor', title: 'Aashadhi Ekadashi Ceremony at CPLS Dindrud' },
  { path: 'assets/images/outdoor/outdoor-2.png', cat: 'outdoor', title: 'National Flag Hoisting & Celebrations' },
  { path: 'assets/images/outdoor/outdoor-3.png', cat: 'outdoor', title: 'Campus Gathering & Cultural Heritage' }
];

// Curated authentic school videos directly from project assets
const curatedVideos = [
  {
    title: 'School Extracurriculars: Music, Yoga & Campus Life',
    description: 'A vibrant showcase of student musical talents, yoga demonstrations, and extracurricular training at Chandrabhaga Podar Learn School.',
    path: 'assets/videos/extracurriculars-showcase.mp4',
    poster: 'assets/images/music/music-1.png'
  },
  {
    title: 'Annual Race Day: Athletics & Sports Day Celebrations',
    description: 'Highlights from the school athletics track meet featuring student sprint races, sportsmanship, and guest dignitaries.',
    path: 'assets/videos/principal-race-day.mp4',
    poster: 'assets/images/sports/sports-1.png'
  },
  {
    title: 'Sports Campus: Cricket Pitch, Kabaddi Mat & Volleyball Court',
    description: 'A tour of student physical education sessions across our cricket grounds, volleyball arenas, and kabaddi practice sessions.',
    path: 'assets/videos/sports-campus.mp4',
    poster: 'assets/images/sports/sports-6.png'
  },
  {
    title: 'Campus Overview & School Atmosphere',
    description: 'Overview video of Chandrabhaga Podar Learn School, Dindrud campus and grounds.',
    path: 'assets/videos/header-video.mp4',
    poster: 'assets/images/outdoor/outdoor-3.png'
  }
];

// @desc    Get Photo Gallery (Curated + Published Event Photos)
// @route   GET /api/gallery/photos
// @access  Public
exports.getPhotos = async (req, res, next) => {
  try {
    const publishedEvents = await Event.find({ status: 'published' }).select('_id title');
    const publishedIds = publishedEvents.map(e => e._id);

    const eventPhotos = await EventMedia.find({
      eventId: { $in: publishedIds },
      mediaType: 'image'
    }).populate('eventId', 'title');

    const dynamicPhotos = eventPhotos.map(ep => ({
      path: ep.filePath,
      cat: 'events',
      title: ep.caption || (ep.eventId ? ep.eventId.title : 'School Event Photo')
    }));

    res.status(200).json({
      success: true,
      photos: [...curatedPhotos, ...dynamicPhotos]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Video Gallery (Curated + Published Event Videos)
// @route   GET /api/gallery/videos
// @access  Public
exports.getVideos = async (req, res, next) => {
  try {
    const publishedEvents = await Event.find({ status: 'published' }).select('_id title coverImagePath');
    const publishedIds = publishedEvents.map(e => e._id);

    const eventVideos = await EventMedia.find({
      eventId: { $in: publishedIds },
      mediaType: 'video'
    }).populate('eventId', 'title coverImagePath');

    const dynamicVideos = eventVideos.map(ev => ({
      title: ev.caption || (ev.eventId ? ev.eventId.title : 'School Event Video'),
      description: 'Event video from ' + (ev.eventId ? ev.eventId.title : 'Chandrabhaga School Event'),
      path: ev.filePath,
      poster: ev.eventId && ev.eventId.coverImagePath ? ev.eventId.coverImagePath : 'assets/images/activity/activity-2.png'
    }));

    res.status(200).json({
      success: true,
      videos: [...curatedVideos, ...dynamicVideos]
    });
  } catch (error) {
    next(error);
  }
};
