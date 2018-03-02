<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <p>
      The 8-minute show at the closing ceremony in Pyeongchang Olympics has made the world eager to see what Beijing has to offer in 2022. After the success of the 2008 Beijing Olympics, people wouldn’t expect anything less.
      Hosting the 2022 Winter Olympic Games presents a golden opportunity for China to promote winter sports.
      According to the Chinese government’s plan, the country will have about 650 skating rinks and 800 ski resorts by 2022.
      By the end of 2016, about 11.3 million Chinese skied at least once a year. China aims to lift that number to 300 million before the next Winter Olympics.
      In fact, the Winter Games four years later has already brought dramatic changes to the country’s sport industry. According to the official statistics, many northern provinces in China saw dramatic surge in the number of tourists visiting major winter tourism destinations during the Chinese Lunar New Year Holiday.
      The Chinese government estimated that the industry value of winter sports will top 1 trillion yuan (US$158 billion) by 2025.
      Moreover, as Beijing will hold the event along with Zhangjiakou, a relatively inconspicuous city in comparison, the level of infrastructure in the area will also be greatly lifted. High speed rails and highways will be built to connect Beijing and Zhangjiakou, in addition to other cities.
      The Olympics Games inspire people to embrace peace, find common ground while respecting differences.
      For many people, the confidence over the mankind was partly restored when the two Koreas held one flag at the opening ceremony of the Pyeongchang Games.
      The Olympics spirit is echoed by the idea of building a shared future for mankind, which was put forward by Chinese President Xi Jinping.
      By holding the Olympics Games, China has the opportunity to lend its traditional wisdom on peace to the world and share its vision of peaceful development.
    </p>
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
<style scoped>
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
</style>
