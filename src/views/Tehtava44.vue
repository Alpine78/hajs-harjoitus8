<template>
  <div class="tehtava44">
    <h1>Tehtävä 44</h1>
    <p>Kirjoita ohjelma joka hakee openweathermap.org -palvelimelta (tai jostain muualta) seuraavan
viikon lämpimimmäksi ennustetun päivän Joensuussa/Kuopiossa. Hae tieto JSON-muodossa
(tai jos käytät XML:ää, niin käytä JSON:ia tehtävässä 45). Käytä Javaa tai jotain scriptikieltä.</p>
  <div v-if="loaded">
    <h2>{{ hottestDayMoment.day }} on lämpimin päivä klo {{ hottestDayMoment.time }} tulevien viiden päivän aikana lämpötilan ollessa {{ maxTemp }} &#x2103;.</h2>
  </div>
  <div v-else>
    <h2>Ladataan...</h2>
  </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  name: 'tehtava44',
  data() {
    return {
      weatherData: null,      
      maxTemp: '',
      hottestDay: null,
      loaded: false
    }
  },
  methods: {
    fetchWeatherData () {
      let vm = this;
      let cityId = 650224; // Kuopio
      let apiKey = 'b6907d289e10d714a6e88b30761fae22';
      let url = `https://openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`;
      console.log(url);

      fetch(url)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              vm.weatherData = data;
              vm.findMaxTemp();
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        }); 
    },
    findMaxTemp () {
      let hottestDay;
      let maxTemp = Number.MIN_SAFE_INTEGER;
      let weatherList = this.weatherData.list;
      for (let weatherIndex in weatherList) {
        let data = weatherList[weatherIndex];
        if (data.main.temp_max > maxTemp) {
          maxTemp = data.main.temp_max;
          hottestDay = new Date(data.dt_txt);
        }
      }
      console.log(maxTemp, hottestDay);
      this.hottestDay = hottestDay;
      this.maxTemp = maxTemp.toString().replace('.', ',');
      this.loaded = true;
    }
  },
  computed: {
    hottestDayMoment () {
      let dayString = moment(this.hottestDay).calendar();
      dayString = dayString.charAt(0).toUpperCase() + dayString.slice(1);
      dayString = dayString.split(" ");
      console.log(dayString);
      return {
        day: dayString[0],
        time: dayString[1] + ' ' + dayString[2]
      };

    }
  },
  created () {
      this.fetchWeatherData();
  },
}
</script>


<style scoped>

</style>
