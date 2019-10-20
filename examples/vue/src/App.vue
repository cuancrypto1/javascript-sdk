<template>
  <div id="app">
    <div v-if="isLoaded">
      <div style="height: 200px; line-height: 200px;">
        <img alt="Floodgate logo" src="./assets/floodgate-logo.png">
        <span style="font-size: 80px; padding: 0 20px; vertical-align: top;">+</span>
        <img alt="Vue logo" src="./assets/logo.png">
      </div>
      <HelloWorld :msg="message"/>
      <button :style="{'background-color':buttonColour, 'padding': '25px'}">Click Me</button>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as floodgate from "floodgate-javascript-sdk";

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      isLoaded: false,
      message: "Floodgate Example App Built with Vue.",
      buttonColour: "yellow"
    };
  },
  created: function() {
    let client = floodgate.createClient("5bb795f32d41df152a0e285c45448d2cc9e7664c1839b2628f271cb1d41b");
    // let config = {
    //   refreshInterval: 10
    // };
    // let client = floodgate.createAutoUpdateClient("5bb795f32d41df152a0e285c45448d2cc9e7664c1839b2628f271cb1d41b", config);

    const _this = this;
    client.on('ready', function() {
      if (client.GetValue("hello-message-enabled", false) == 'true') {
        _this.message = 'flag "hello-message-enabled" is enabled';
      }

      _this.buttonColour = client.GetValue("buy-now-button-colour", 'blue');

      _this.isLoaded = true;
    });

    /**
     * If you don't want to wait for the client ready event you can use the FetchValue() method
     * FetchValue() will attempt to evaluate the flag from the cache and if not available it will
     * check for flag data on the remote server.
     * It's recommended to use the client `ready` event.
     */
    // client.FetchValue("hello-message-enabled", false, (value) => {
    //   if (value == 'true') {
    //     _this.message = 'flag "hello-message-enabled" is enabled';
    //   }
    // });

    // client.FetchValue("buy-now-button-colour", 'blue', (value) => {
    //   _this.buttonColour = value;
    // });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
