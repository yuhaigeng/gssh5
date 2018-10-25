<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}


.sprite{background-image:url(../assets/img/sprite.png);background-repeat:no-repeat ;}
.icon_location_a{background-position:-422px -318px;}/*21.16*/


.arrow_left{background-position:21px -210px;}
.arrow_left_b{background-position:21px -280px;}/*0.9*/
.arrow_left_orange{background-position:21px -352px;}/*0.9*/


.icon_search_a{background-position:-1000px 20px;}/*85,20*/


.icon_voice{background-position:-1084px -444px;}

</style>
