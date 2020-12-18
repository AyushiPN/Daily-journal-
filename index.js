const express =  require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

let posts = [];

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "+
"incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris";

const aboutContent = "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit"+ 
"esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa"+
 "qui officia deserunt mollit anim id est laborum";

 const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "+
"incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris";
 
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", function(req,res){
	

	res.render("home",{text: homeStartingContent, posts: posts});

});

app.get("/about", function(req, res){

	res.render("about",{aboutText : aboutContent});
});

app.get("/contact", function(req,res)
{
	res.render("contact", {contactText: contactContent});
});

app.get("/compose", function(req, res){
	res.render("compose");
});

app.post("/compose", function(req, res){

	const post = {
		title : req.body.postTitle,
		content : req.body.postBody
	};
	posts.push(post);
	res.redirect("/");
		
});

app.get("/posts/:postName", function(req,res)
{
	let head = req.params.postName;

	 posts.forEach(function(post){ 
			let value = post.title;
			let a = _.lowerCase(value);
			let postText = post.content;
	if(head==a)
	{
		console.log("Match Found!!");
		res.render("post",{head : post.title, postText:postText});
	}

	
	});

	
})




app.listen(3000, function()
{
	console.log("Server is running on port 3000");
});