//Vue Instance
new Vue({
  el: '#app',

  //Variables
  data: () => ({
    active5: false,
    loggedIn: '',
    user_id: ''
  }),

  //Created Lifecycle
  created() {
      this.getLoggedIn();
    },

  methods: {
    checkSession() {
      //checks to see if user is currently logged in, and redirects to different pages based on the status
      if (this.loggedIn=="true") {
        window.location.replace("http://localhost:5500/pages/browse.html");
      } else {
        window.location.replace("http://localhost:5500/pages/login.html");
      }
    },

    //Checks to see if user is logged in using local storage
    getLoggedIn() {
      try {
        this.loggedIn = localStorage.getItem("status");
      }
      catch(err) {
        this.loggedIn = false;
        localStorage.setItem("status", false);
      }
    }
    }
})