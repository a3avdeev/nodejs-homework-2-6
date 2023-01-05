const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);

    const image = await jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
