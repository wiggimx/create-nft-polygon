<template  lang="pug">
  div
    b-loading(:is-full-page="true" v-model="isMinting" :can-cancel="true")
    section.hero.is-primary.is-light.is-fullheight.hero-background
      // Hero head: will stick at the top
      .hero-head
        header.navbar
          .container
            .navbar-brand
              a.navbar-item
                p.pixel-font CryptoLucha
            #navbarMenuHeroC.navbar-menu
              .navbar-end
                a.navbar-item(href='https://github.com/wiggimx/create-nft-polygon' target="_blank")
                  span.icon
                    font-awesome-icon(:icon="['fab','github']")
                  span.pixel-font Github
                a.navbar-item
                  span.pixel-font {{account}}
                span.navbar-item(v-if="account==null")
                  a.button.is-primary.is-inverted(@click="connect")
                    span.icon
                      i.fab.fa-github
                      font-awesome-icon(icon="wallet")
                    span.pixel-font Conecta tu billetera
      // Hero content: will be in the middle
      .hero-body
        .container.has-text-centered
          img(src="./assets/caras.gif" width="45%")
          h1.pixel-font.is-size-1.mt-2 Crypto Lucha
          b-button.mt-4(type="is-primary is-light" @click="mint") 
            span.pixel-font ! Mintea tu luchador ahora !
    .container.mt-5
      p.is-size-5.pixel-font Tus NFTS
      .grid.mt-6
        card(v-for="i in figthers" :key="i" :id="i")
    footer.footer.mt-6
      .content.has-text-centered
        p
          strong Cryptolucha
          |  esta hecho con mucho ❤  por 
          a(href='https://twitter.com/xgartur' target="_blank") Arturo Guerrero
        a(href='https://github.com/wiggimx/create-nft-polygon' target="_blank") 
          span.icon
            font-awesome-icon(:icon="['fab','github']")
          span.pixel-font Github

</template>

<script>
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  async mounted(){
    await this.$store.dispatch("connect", 1);
    await this.$store.dispatch("getIFPS")
    await this.$store.dispatch("getMaxSupply")
    await this.$store.dispatch("getTokensByOwner")
  },
  methods:{
    async mint(){
      console.log("hello")
      await this.$store.dispatch("mint");
    },
    async connect() {
      await this.$store.dispatch("connect", 1);
    },
  },
  computed:{
    isMinting(){
      return this.$store.getters.mint
    },
    account(){
      return this.$store.getters.account
    },
    figthers(){
      return this.$store.getters.figthers
    },
  }
}
</script>

<style>
.hero-background{
  background-image: url("./assets/fondogrande.png");
}
.pixel-font{
  font-family: 'Press Start 2P', cursive;
}
.grid{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto; 
  gap: 10px;
}
</style>
