let express = require("express");
let cors = require("cors");
let pg_obj = require("./pgconnect");
let { fullNames } = require("./name_array");
let jokes = require("./jokes");
let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

//console.log(__dirname);

app.get("/", async (req, res, next) => {
  try {
    //res.send("this is from the pc");
    let result = await pg_obj.query("SELECT * FROM members");
    res.send(result.rows);
    //res.send("This is another route of the backend");
    //let name = "fullname"
    //res.json([{[name] : "debottam kar", age : 22},{sex : "male", cgpa : 8.348}]);
  }
  catch (err) {
    next(err);
  }
});

app.post("/", async (req, res, next) => {
  console.log("Request received");
  console.log(req.body.name);
  let result = await pg_obj.query("SELECT * FROM members");
  //console.log(result.rows);
  res.send(result.rows);
  //res.send("'Hello from the backend made using postgresql and express by Debottam'");
  //res.send("hi");
});

app.get("/pdf", (req, res) => {
  res.sendFile(__dirname + '/rr_note.pdf');
});

//dynamic routing
app.get("/members/:name", async (req, res, next) => {
  let name = req.params.name;
  res.sendFile(__dirname + "/index.html");
});

app.use((req, res, next) => {
  console.log("This is a middleware function it will be run at first");
  next();
});

//custom middleware
function run(req, res, next) {
  console.log("This is a middleware function it will be run at second");
  if (req.body.username == "debottam")
    next();
  else
    res.send("you are fake");
  next();
}
//app.use(run);

app.post('/login', run, (req, res, next) => {
  res.send("you are logged in");
});

app.get("/jokes", (req, res, next) => {
  res.render("jokes");
});

app.post("/generate", (req, res, next) => {
  //let arr = [13, 11, 7, 8, 9, 10];
  //let randomname = fullNames[Math.floor(Math.random() * fullNames.length)];
  //res.send({data : [7,8,9,10,11,12]});
  let randomjoke = jokes[Math.floor(Math.random() * jokes.length)];
  //res.render("jokes",{data : randomname});
  res.render("jokes", { data: randomjoke });
  //res.render("jokes", { data: {name : "deb", age : 22, cgpa : 8.4} });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(404).send("There is an error");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});


