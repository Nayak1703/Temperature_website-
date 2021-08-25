const express = require(`express`);
const https = require(`https`);
const app = express();

app.get(`/`, (req,res) => {
  console.log(__dirname);
  res.sendFile(__dirname+`/index.html`);
});

app.use(express.urlencoded({extended: true}));

app.post(`/`, (req,res)=> {
  console.log(req.body);
  console.log(req.body.city);
  console.log(`post recived`);

  const apiKey = `21075b7ad699cb97d4612592ba213773`
  let query  = req.body.city
  const url= `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  https.get(url, (resp) => {
    console.log(resp.statusCode);

    resp.on(`data`, (data) => {
      console.log(data);
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const location = weatherData.name
      const temp = weatherData.main.temp;
      const wind = weatherData.wind.speed;
      const humidity = weatherData.main.humidity;
      const discription = weatherData.weather[0].description;
      const icon =weatherData.weather[0].icon;
      const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

      console.log(`Location: ${location} temp: ${temp} wind: ${wind} humidity: ${humidity} discription: ${discription}`);

      res.write(`<h1>The Temperature of `+location+` is `+temp+` degree Celsius </h1>`);
      res.write(`<p>The Weather is ${discription}</p>`);
      res.write(`<img src=${imgUrl}>`);
      res.send();
    });
  });

});
app.listen(3000, () => console.log(`Server is Up and Running on port 3000`));
