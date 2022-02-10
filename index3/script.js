new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: () => ({
    items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
    model: ['Vuetify'],
    search: null }),


  watch: {
    model(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
    } } });