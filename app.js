const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city=req.body.cityName;
  const appid="4960813becf2cb94ba65729b90362f62";
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
     const temp=weatherData.main.temp;
     const desc=weatherData.weather[0].description;
     const iconCode=weatherData.weather[0].icon;
     const imgURL="http://openweathermap.org/img/wn/"+ iconCode+"@2x.png";
     res.write("<h1>The temp in "+city+" is "+temp+" degree celcius</h1>");
     res.write("<h3>The weather is like: "+desc+"</h3>");
     res.write("<img src="+imgURL+">");
     res.send();
    })

  console.log("post request recieved");
})
})




app.listen(3000,function(){
  console.log("Server running on 3000");
})
