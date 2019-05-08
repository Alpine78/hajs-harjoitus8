<template>
  <div class="tehtava45">
    <h1>Tehtävä 45</h1>
    <p>Perehdy Postin ohjeeseen ”Noutopisterekisterin integrointiohje” http://www.posti.fi/
liitteet-yrityksille/muut/noutopisterekisterin-integrointiohje.pdf erityisesti
sen REST-liittymän osalta (alakohta 3.3.3). Kirjoita ohjelma joka hakee halutun postinumeron Postin noutopisteet. Postin kysely palauttaa (ainakin pyydettäessä) XML:ää,
joten jäsennä palvelupisteiden tieto sieltä DOM:llä, SAXP:llä tai muulla valitsemasi
ohjelmointikielen XML-kirjastolla. Jos kysely palauttaa JSON:a eikä XML:ää, lisää pyynnön
otsikkoon kenttä ”Accept: application/xml”:
Pythonilla: request.add_header(’Accept’, ’application/xml’);
Java:lla: connection.setRequestProperty("Accept", "application/xml");</p>
<p>XML:ää ei saa kaikista postinumeroista. Esim. 74595 antaa XML:ää.</p>
    <form v-on:submit.prevent="fetchData">
      <input type="number" maxlength="5" v-model="zip" placeholder="Postinumero">
      <button>Hae</button>
    </form>

    <p v-if="hasFetched">
      Postinumeron {{ fetchedZip }} lähin noutopiste on paikkakunnalla {{ result.Municipality[0] }} osoitteessa {{ result.Address[0] }}. Noutopaikka on {{ result.AdditionalInfo[0] }}.

    </p>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  name: 'tehtava45',
  data() {
    return {
      zip: '',
      result: '',
      fetchedZip: '',
      hasFetched: false
    }
  },
  methods: {
    fetchData () {
      let vm = this;
      vm.hasFetched = false;
      vm.fetchedZip = '';
      let url = `https://ohjelmat.posti.fi/pup/v1/pickuppoints?zipcode=${this.zip}`;
      console.log('Haetaan: ', url);
      // const headers = {
      //   'Accept': 'application/xml'
      // };
      // axios.get(url, {headers})
      //   .then(function (response) {
      //     console.log(response.data);

      //   }) 
      //   .catch(function (error) {
      //     console.log(error);
      //   });     

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          // Postinumerosta riippuen saattaa tulla XML tai JSON

          var parseString = require('xml2js').parseString;
          // var xml = "<root>Hello xml2js!</root>"
          parseString(this.responseText, function (err, result) {
            // console.dir(result.ArrayOfPickupPoint.PickupPoint[0]);
            vm.result = result.ArrayOfPickupPoint.PickupPoint[0];
          });
          // vm.result = JSON.parse(this.responseText);
          console.log(vm.result);
          vm.fetchedZip = vm.zip;
          vm.hasFetched = true;
        }
      };
      xhttp.open("GET", url, true);
      xhttp.setRequestHeader('Accept', 'application/xml');
      xhttp.send();  
    },
  }
}
</script>


<style scoped>

</style>
