/**
 * Title: aboutus.js
 * 
 * Javascript for aboutus.html, used to store data for displaying and interactions
 */

//Vue Instance
new Vue({
  el: '#app',

  //Variables
  data: () => ({

    themeSwitch: '', //value for switch
    loggedIn: '', //boolean if user is logged in
    user_id: '' //user id

  }),

  //Created Lifecycle
  created() {

      this.getLoggedIn(),
      this.getTheme();

    },

  methods: {

     //Retrieves user's choice of theme
     getTheme() {

      try {

        this.mode = localStorage.getItem("theme");

        if (this.mode == "light") {

          this.themeSwitch = false;

        } else {

          this.themeSwitch = true;
          this.firstTime();

        }

      }

      catch (err) {

        this.mode = "light";
        localStorage.setItem("theme", "light");
        this.themeSwitch = false;

      }

    },

    //checks to see if user is currently logged in, and redirects to different pages based on the status
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

    //Switch Between Dark and Light Mode
    theme() {

      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //LocalStorage Switches
      if(localStorage.getItem("theme") == "light") {

        localStorage.setItem("theme", "dark");

      }

      else if (localStorage.getItem("theme") ==  "dark") {

        localStorage.setItem("theme", "light");

      }

      //Switch Footer Logo
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      else {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

    },

    //Switch Between Dark and Light Mode When Opened
    firstTime() {

      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //Switch Footer Logo
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      else {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

    }

  }

})