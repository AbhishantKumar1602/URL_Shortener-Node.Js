const shortid = require('shortid');

const URL = require('../models/url');

async function createNewUrl (req, res) {
     const body = req.body;
     if (!body.url) 
          return res.status(400).json({ error: 'URL is required' });
     try {
          // First, check if this URL already exists for this user to prevent duplicates.
          const existingUrl = await URL.findOne({
               redirectionUrl: body.url,
               createdBy: req.user._id,
          });

          if (existingUrl) {
               return res.status(409).json({ error: 'URL already has a shortened ID for you.' });
          }

          const shortId = shortid();
          await URL.create({
               shortId: shortId,
               redirectionUrl: body.url,
               visitHistory: [],
               createdBy: req.user._id,
          });
          const allUrls = await URL.find({ createdBy: req.user._id });
          return res.render("home", {
               shortId: shortId,
               urls: allUrls
          });
     } catch (error) {
          if (error.code === 11000) { 
               if (error.keyPattern && error.keyPattern.shortId) {
                    return res.status(500).json({ error: 'Failed to generate a unique ID. Please try again.' });
               }
               return res.status(409).json({ error: 'URL already has a shortened ID for you.' });
          }
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
     }
};

async function getAnalytics(req, res) {
     const shortId = req.params.shortId;
     const entry = await URL.findOne({ shortId });
     if (!entry) {
          return res.status(404).json({ error: 'URL not found' });
     }
     res.json({
          totalClicks: entry.visitHistory.length,
          analytics: entry.visitHistory,
     });
}

module.exports = {
     createNewUrl, 
     getAnalytics,
};