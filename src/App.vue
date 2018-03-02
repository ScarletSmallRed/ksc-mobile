<template>
  <div id="app">
    <router-view/>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="products">
        <router-link to="/">
          <div style="font-size:2em; color:#409EFF">
            <i class="fa fa-th-list"></i>
            <div style="font-size: 10px;">
              产品
            </div>
          </div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="cart">
        <router-link to="/cart">
          <div style="font-size:2em; color:#409EFF">
            <i class="fa fa-shopping-cart"></i>
            <div style="font-size: 10px;">
              购物车
            </div>
          </div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="info">
        <router-link to="/info">
          <div style="font-size:2em; color:#409EFF">
            <i class="fa fa-user"></i>
            <div style="font-size: 10px;">
              个人信息
            </div>
          </div>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				selected: ''
			}
		},
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
  a {
    color: #409EFF;
    text-decoration: none;
  }
</style>
