<template>
  <div class="tehtava46">
    <h1>Tehtävä 46</h1>
      <p>Muunna tehtävän 45 ohjelma hakemaan lähimmät (esim. 4 lähintä) SmartPost pakettiautomaatit. Automaatteja ei voi suoraan hakea postinumerolla, vaan koordinaateilla.
      Koordinaatit saat tehtävän 45 hakemasta XML-dokumentista.
      </p>
      <p>Kaikista postinumeroista ei saa JSON:ia, mutta esim. 70420 antaa.</p>
      <form v-on:submit.prevent="fetchPost">
        <input type="number" maxlength="5" v-model="zip" placeholder="Postinumero">
        <button>Hae postinumerolla</button>
    </form>
    <button @click="getLocation">Hae paikannuksella</button>

    <p>
      Sijaintisi on {{ longitude}}  {{latitude}}.
    </p>

    <div v-if="hasFetched">
      <h4>Lähimmät SmartPost-automaatit ovat:</h4>
      <ul>
        <li v-for="(smartPost, index) in smartPosts" :key="index">
          {{ smartPost.PublicName }} osoitteessa {{ smartPost.Address }}, {{ smartPost.Municipality }} - {{ smartPost.AdditionalInfo }}.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tehtava46',
  data() {
    return {
      errorMsg: '',
      latitude: '',
      longitude: '',
      zip: '',
      result: '',
      fetchedZip: '',
      hasFetched: false,
      smartPosts: []    
    }
  },
  created () {
    this.getLocation();
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.showPosition);
      } else {
        this.errorMsg = "Geolocation is not supported by this browser.";
      }
      this.fetchSmartPosts();
    },
     showPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
    },
    fetchPost () {
      let vm = this;
      vm.hasFetched = false;
      vm.fetchedZip = '';
      let url = `https://ohjelmat.posti.fi/pup/v1/pickuppoints?zipcode=${this.zip}`;
      console.log('Haetaan posti: ', url);
      fetch(url)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
            // Examine the text in the response
            response.json()
            .then(function(data) {
              console.log(data);
              vm.latitude = data[0].MapLatitude;
              vm.longitude = data[0].MapLongitude;
              vm.fetchSmartPosts();

              // var jsonText = JSON.stringify(vm.xmlToJson(data));
              // console.log(jsonText);

            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });  
    },
    fetchSmartPosts () {
      let vm = this;
      vm.hasFetched = false;
      vm.fetchedZip = '';
      let url = `https://ohjelmat.posti.fi/pup/v1/pickuppoints?type=smartpost&longitude=${this.longitude}&latitude=${this.latitude}&top=5`;
      console.log('Haetaan automaatit: ', url);

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
              vm.smartPosts = data;
              vm.hasFetched = true;
              // vm.weatherData = data;
              // vm.findMaxTemp();
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });  
    }
  }
}
</script>


<style scoped>

</style>
