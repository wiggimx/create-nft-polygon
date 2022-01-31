<template lang="pug">
div(v-if="metadata!=null")
  img(:src='metadata.image' alt='Placeholder image')
  p.is-size-4.pixel-font {{metadata.name}}
</template>
<script>
export default {
  props:['id'],
  data(){
    return{
      metadata:null
    }
  },
  created(){
    fetch(`${this.$store.getters.ifps}${this.id}`)
      .then(res => res.json())
      .then((out) => {
          this.metadata=out
      })
      .catch(err => console.error(err));
  },
  computed:{
    metadataURL(){
      return `${this.$store.getters.ifps}${this.id}`
    }
  }

}
</script>
<style>
.pixel-font{
  font-family: 'Press Start 2P', cursive;
}

</style>
