import Url from '../models/urlModel.js';
import crypto from 'crypto';



// Create a shortened URL
export const createShortUrl = async (req, res) => {
  const { originalUrl, shortUrl, userId } = req.body;

  try {
    const shortCode = shortUrl ;

    const existing = await Url.findOne({ shortCode });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Shortcode already exists",
      });
    }

    const newUrl = new Url({
      originalUrl,
      shortCode,
      userId,
    });

    await newUrl.save();
    res.status(201).json({newUrl, message:"short url created"});
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error generating short URL" });
  }
};


// Redirect to original URL using shortCode
export const handleRedirect = async (req, res) => {
        const { shortUrl } = req.body;
      
        try {
          const url = await Url.findOne({ shortCode: shortUrl });
          if (!url) return res.status(404).json({ message: 'Short URL not found' });
      
          res.status(200).json(url);
        } catch (err) {
          res.status(500).json({ message: 'Server error' });
        }
};

// Get all URLs for a user
export const getUserUrls = async (req, res) => {
  const userId = req.user?._id || req.body.userId;

  try {
    const urls = await Url.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ error: "error to fetch url" });
  }
};

export const fetchShortUrl = async (req, res) => {
  const { shortUrl } = req.body;

  try {
    const urlDoc = await Url.findOneAndUpdate(
      { shortCode: shortUrl },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!urlDoc) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    res.json({ originalUrl: urlDoc.originalUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
