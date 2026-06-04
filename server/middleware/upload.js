const multer = require("multer");
const path = require("path");
const supabase = require("../db");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /\.(jpg|jpeg|png|webp|gif|mp4|mov|avi)$/i;
  if (allowed.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error("Недопустимый формат файла"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});

async function supabaseUpload(file) {
  const ext = file.originalname.split(".").pop();
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  const filePath = `works/${uniqueName}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) return { error };
  return { path: filePath };
}

function getPublicUrl(filePath) {
  const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);
  return data.publicUrl;
}

module.exports = upload;
module.exports.supabaseUpload = supabaseUpload;
module.exports.getPublicUrl = getPublicUrl;
