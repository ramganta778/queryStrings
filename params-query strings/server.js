let mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");

let app = express();
app.use(cors());

app.get("/CountriesList", async (req, res) => {
  let countriesList = await Employee.find().distinct("country");

  res.json(countriesList);
});

app.get("/genderList", async (req, res) => {
  let genderList = await Employee.find().distinct("gender");

  res.json(genderList);
});

app.get("/employees", async (req, res) => {
   console.log(req.query);

  let employees = await Employee.find().and([{country:req.query.country},{gender:req.query.gender}]);
  res.json(employees);
});



app.listen(9441, () => {
  console.log("Port Number Is Ready");
});

let employeeSchema = new mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  country: String,
  profilePic: String,
  salary: Number,
});

let Employee = new mongoose.model("employee", employeeSchema);

let connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ramganta778:balaji@cluster0.vhgpcgw.mongodb.net/amazon?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Successfully Connected To The DB");
  } catch (err) {
    console.log("Unable To DB");
  }
};
connectToDB();
