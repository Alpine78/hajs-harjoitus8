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
    <form v-on:submit.prevent="fetchData">
      <input type="number" maxlength="5" v-model="zip">
      <button>Hae</button>
    </form>

    <p v-if="hasFetched">
      Postinumeron {{ fetchedZip }} lähin noutopiste on paikkakunnalla {{ result[0].City }} osoitteessa {{ result[0].Address }}.

    </p>
  </div>
</template>

<script>

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

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          vm.result = JSON.parse(this.responseText);
          console.log(vm.result);
          vm.fetchedZip = vm.zip;
          vm.hasFetched = true;
        }
      };
      xhttp.open("GET", url, true);
      xhttp.setRequestHeader('Accept', 'application/xml');
      xhttp.send();
  
    }
  }
}
</script>


<style scoped>

</style>
