<template>
  <div class="tehtava43">
    <h1>Tehtävä 43</h1>
    <p>. Kirjoita ohjelma joka hakee lähikauppasi aukioloajat tälle päivälle. Aukioloaikapalvelua ei
välttämättä ole tarjolla varsinaisesti ohjelmallisesti käytettävänä web-palveluna, vaan joudut
ehkä selaamaan sopivan www-osoitteen antamaa HTML-sivua ja kaivamaan tiedon HTMLdokumentista. Selaamisen voit tehdä käsipelissä, tai esim. jsoup-kirjastoa käyttäen. Käytä
Javaa tai jotain scriptikieltä.</p>
<h3>S-Market Vuorela</h3>
<p>{{ htmldoc }}</p>
  </div>
</template>

<script>
export default {
  name: 'tehtava43',
  data() {
    return {
      url: 'https://cors.io/?https://www.s-kanava.fi/web/peeassa/toimipaikka/s-market-vuorela/725615601', // S-Market Vuorela
      htmldoc: 'Ladataan...'
    }
  },
  methods: {
    fetchData () {
      let vm = this;
      fetch(this.url)
          .then(function(response) {
              // When the page is loaded convert it to text
              return response.text()
          })
          .then(function(html) {
              // Initialize the DOM parser
              var parser = new DOMParser();

              // Parse the text
              var doc = parser.parseFromString(html, "text/html");

              // You can now even select part of that html as you would in the regular DOM 
              // Example:
              // var docArticle = doc.querySelector('article').innerHTML;

              var docArticle = doc.querySelector('.openingtime p').innerText;

              console.log(docArticle);
              vm.htmldoc = docArticle.toString();
          })
          .catch(function(err) {  
              console.log('Failed to fetch page: ', err);  
          });
    }
  },
  created () {
    this.fetchData();
  }
}
</script>


<style scoped>

</style>
