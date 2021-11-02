const multer = require('multer');

// Types of extensions files
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb("Please upload only images, like : jpg, png, gif, etc.", false);
  }
};

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../images/messages/');// Folder's destination for uploaded images
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_'); // Replace spaces with _ // Create a table with filenames
    cb(null, Date.now() + "-" + name) // null to verify if there's errors + name + precise timestamp to make an unique filename
  }// In ideal case, use user_name + message_id for the filename
});

// EXPORT multer-config module for unique image
module.exports = multer({ storage: storage, fileFilter: imageFilter });