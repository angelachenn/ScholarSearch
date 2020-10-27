const logURL = "http://localhost:8080"
new Vue({
  el: '#app',
  data: () => ({
    active5: false,
    session: []
  }),
  created() {
    fetch(logURL)
      .then(response => {
        return response.json();
      })
      .then(session => {
        this.session = session;
      })
    },
  methods: {
      checkSession() {
          if (this.session.status==true) {
            window.location.replace("http://localhost:5500/pages/browse.html");
          } else {
            window.location.replace("http://localhost:5500/pages/login.html");
          }
        }
      
    }
  })