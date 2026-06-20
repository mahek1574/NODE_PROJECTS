const Song = require("../model/song");

exports.createSong = async (req, res) => {
  try {
    const { title, artist, album, coverImage, audioUrl } = req.body;

    if (!title || !artist || !coverImage || !audioUrl) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const song = await Song.create({
      title,
      artist,
      album,
      coverImage,
      audioUrl,
      uploadedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("uploadedBy", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: songs.length,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate(
      "uploadedBy",
      "username email",
    );

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    res.status(200).json({
      success: true,
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Song updated successfully",
      song: updatedSong,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    await song.deleteOne();

    res.status(200).json({
      success: true,
      message: "Song deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
