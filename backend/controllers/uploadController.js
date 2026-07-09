export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    res.json({
      imageUrl: req.file.path,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};