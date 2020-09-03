//Getting Longitude and Latitude from our location
window.addEventListener("load", () => {
  let long;
  let lat;
  //Selecting DOM
  const msg = document.querySelector("#alert");
  const tempDescription = document.querySelector(".temperature-description");
  const tempDegree = document.querySelector(".temperature-degree");
  const timezone = document.querySelector(".location-timezone");
  const weatherIcon = document.querySelector(".temp-icon");

  navigator.geolocation
    ? navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = "https://cors-anywhere.herokuapp.com/";
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f60427d3414b44c1053387a2da511d2f`;

        fetch(api)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            //Using Data Destructuring
            const { name } = data;
            const { temp } = data.main;
            const { description, id, icon, main } = data.weather[0];

            //Updating DOM with API
            timezone.textContent = name;
            tempDegree.textContent = Math.round(temp - 273);
            tempDescription.textContent = main;
            // weatherIcon.textContent = id;
            if (id < 250) {
              weatherIcon.src = "./icons/storm.svg";
            } else if (id < 350) {
              weatherIcon.src = "./icons/drizzle.svg";
            } else if (id < 550) {
              weatherIcon.src = "./icons/rain.svg";
            } else if (id < 650) {
              weatherIcon.src = "./icons/snow.svg";
            } else if (id < 800) {
              weatherIcon.src = "./icons/atmosphere.svg";
            } else if (id === 800) {
              weatherIcon.src = "./icons/sun.svg";
            } else if (id > 800) {
              weatherIcon.src = "./icons/clouds.svg";
            }
            console.log(Math.round(temp - 273));
            console.log(name);
          });
      })
    : (msg.textContext = "Please turn on geo location");
});
