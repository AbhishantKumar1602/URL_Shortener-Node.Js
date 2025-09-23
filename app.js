require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require ('./connect')
const URL = require('./models/url');
const { checkForAuth,restrictTo, } = require('./middlewares/auth');
const Mongo_Url = process.env.MONGO_URL ||'mongodb+srv://root:1602@akmongo.sya0hez.mongodb.net/Custom_URL_Shortener?retryWrites=true&w=majority&appName=AkMongo';

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.locals.BASE_URL = process.env.BASE_URL || `http://localhost:${port}`;


connectToMongoDB(Mongo_Url)
     .then(() => console.log("MongoDB Connected!"))
     .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuth);

app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);

app.use('/url/:shortId', async (req, res) => {
     const shortId = req.params.shortId;
     const entry = await URL.findOneAndUpdate(
          { shortId }, 
          { $push: { visitHistory: { timestamp: new Date() } },
     });
     if (!entry) {
          return res.status(404).json({ error: 'URL not found' });
     }
     res.redirect(entry.redirectionUrl);
});

/* ========================
   API endpoints for bot
======================== */

// POST /shorten → create a new short URL
app.post('/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const shortId = Math.random().toString(36).substring(2, 8);

    const entry = await URL.create({
      redirectionUrl: url,
      shortId,
      visitHistory: []
    });

    return res.json({
      shortId: entry.shortId,
      shortUrl: `${req.protocol}://${req.get("host")}/url/${entry.shortId}`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /expand/:id → get original URL from shortId
app.get('/expand/:id', async (req, res) => {
  try {
    const entry = await URL.findOne({ shortId: req.params.id });
    if (!entry) return res.status(404).json({ error: "Not found" });

    return res.json({ url: entry.redirectionUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});



app.listen(port, () => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
  console.log(`✅ Server running at ${baseUrl}`);
});
