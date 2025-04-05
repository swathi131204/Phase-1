
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Parser = require("rss-parser");

const app = express();
const parser = new Parser();
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

const articleSchema = new mongoose.Schema({
  title: String,
  link: String,
  pubDate: Date,
  contentSnippet: String,
  source: String,
  read: { type: Boolean, default: false }
});
const Article = mongoose.model("Article", articleSchema);

const feeds = [
  "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "https://feeds.bbci.co.uk/news/rss.xml"
];

const fetchFeeds = async () => {
  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        const exists = await Article.findOne({ link: item.link });
        if (!exists) {
          await Article.create({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate),
            contentSnippet: item.contentSnippet,
            source: feed.title
          });
          console.log(`✅ Added: ${item.title}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error fetching ${url}:`, err.message);
    }
  }
};

app.get("/fetch", async (req, res) => {
  await fetchFeeds();
  res.send("✅ Fetched and saved articles!");
});

app.get("/articles", async (req, res) => {
  const { source, keyword, read } = req.query;
  let query = {};

  if (source) query.source = source;
  if (read !== undefined) query.read = read === "true";
  if (keyword) query.title = { $regex: keyword, $options: "i" };

  const articles = await Article.find(query).sort({ pubDate: -1 });
  res.json(articles);
});

app.put("/articles/:id/read", async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;
  await Article.findByIdAndUpdate(id, { read });
  res.send(`🔄 Article marked as ${read ? "read" : "unread"}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
