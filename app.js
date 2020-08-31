//Getting Longitude and Latitude from our location
window.addEventListener("load", () => {
  let long;
  let lat;
  //Selecting DOM
  const msg = document.querySelector("#alert");
  const tempDescription = document.querySelector(".temperature-description");
  const tempDegree = document.querySelector(".temperature-degree");
  const timezone = document.querySelector(".location-timezone");
  //const iconText = document.querySelector(".icon");

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
            const city = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0]["description"];
            const icon = data.weather[0]["icon"];
            //Updating DOM with API
            timezone.textContent = city;
            tempDegree.textContent = temperature;
            tempDescription.textContent = description;

            //Set Icon
            setIcons(icon, document.querySelector(".icon"));
          });
      })
    : (msg.textContext = "Please turn on geo location");
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase;
    skycons.play();
    return skycons.set(iconID, skycons[currentIcon]);
  }
});
