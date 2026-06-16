import Notice from '../models/Notice.js';

export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotice = async (req, res) => {
  const { title, description } = req.body;

  try {
    const notice = await Notice.create({
      title,
      description,
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateNotice = async (req, res) => {
  const { title, description } = req.body;

  try {
    const notice = await Notice.findById(req.params.id);

    if (notice) {
      notice.title = title || notice.title;
      notice.description = description || notice.description;

      const updatedNotice = await notice.save();
      res.json(updatedNotice);
    } else {
      res.status(404).json({ message: 'Notice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (notice) {
      await Notice.findByIdAndDelete(notice._id);
      res.json({ message: 'Notice removed successfully' });
    } else {
      res.status(404).json({ message: 'Notice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
