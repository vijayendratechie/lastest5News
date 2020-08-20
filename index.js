console.log("Hello");

const express = require("express");
const request = require("request");
const fs = require('fs');
const cheerio = require('cheerio');

const app = express();

app.get("/latestNews",function(req,res){
	request({uri: "https://time.com/"},function(error, response, body) {
		if(error) {
			res.send("Error ocurred. Please try after sometime");
		}

		let $ = cheerio.load(body);

		let latestStoriesSection = $("section[data-module_name='Latest Stories']");
		latestStoriesSection = latestStoriesSection.html();
		$ = cheerio.load(latestStoriesSection)

		let latest5News = [];

		$("li").each(function(i) {
			latest5News.push({
				"title": $(this).find("a").text(),	
				"link": "https://time.com/"+$(this).find("a").attr("href")
			})
		})

		res.send(latest5News);
	  });

})

app.listen(port = 3000, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})