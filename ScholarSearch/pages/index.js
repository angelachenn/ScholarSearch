//Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {
    return {
      active5: false,
      loggedIn: '',
      user_id: ''
    }
  },

  //Created Lifecycle Hook
  created() {
    this.getLoggedIn();
  },

  //Methods
  methods: {

    //Check to see if User is logged in
    checkSession() {
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
    },
    /*
    getUserId() {
      try {
        this.user_id = localStorage.getItem("id");
      }
      catch (err) {
        this.user_id = 0;
        localStorage.setItem("id", 0)
      }
    }
    */
  }
  })