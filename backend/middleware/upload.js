// backend/middleware/upload.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files into uploads/products
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    // Save only filename (timestamp + extension)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
