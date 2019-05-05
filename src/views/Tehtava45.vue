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
  </div>
</template>

<script>
export default {
  name: 'tehtava45',
  data() {
    return {

    }
  }
}
</script>


<style scoped>

</style>
