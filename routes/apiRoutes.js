const axios = require("axios");
const router = require("express").Router();
const cheerio = require("cheerio");

router.get("/recipes", (req, res) => {
  axios
    .get("http://www.recipepuppy.com/api/", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

router.get("/articles",(req, res) =>{
  axios
    .get("https://www.charlotteagenda.com/")
    .then((response) => {
      let $ = cheerio.load(response.data);
      
      let kurs = [];
      $("div.indexstory").each(function (i, element) {
        kurs.push({
        title: $(this).find("h1.entry-title").text(),
        link: $(this).find("h1.entry-title").children("a").attr("href"),
        // tag: $(this).find("div.entry-item").find("a.indextag").text()
        image: $(this).find("div.thumbnail_image").children("a").children("img").attr("src")
        // blurb: $(this).find("div.excerpt.fullview").text()
        // res.json(element)
        })
      })
    //   res.json($("div.indexstory"[0]))
    console.log(kurs);
      res.json(kurs);
  })
    .catch(err => res.status(422).json(err));

});

module.exports = router;
