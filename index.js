/**
 * Title: index.js
 * 
 * Javascript for index.js, used to store data for displaying and interactions
 */

//Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {

    return {

      loggedIn: '', //boolean if user is logged in
      user_id: '', //user id
      mode: '', //sets theme
      themeSwitch: '' //value of switch

    }

  },

  //Created Lifecycle Hook
  created() {

    this.getLoggedIn();
    this.getTheme();

  },

  //Methods
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

    //Switches Between Dark and Light Mode
    theme() {

      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //LocalStorage Switches
      if(localStorage.getItem("theme") == "light") {

        localStorage.setItem("theme", "dark");

      }

      else if (localStorage.getItem("theme") ==  "dark") {

        localStorage.setItem("theme", "light");

      }

      //Main Logo Swap
      if (document.getElementById("Logo").src == "http://localhost:5500/assets/scholarsearch.png") {

        document.getElementById("Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

      else {

        document.getElementById("Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      //Diploma Image Swap
      if (document.getElementById("left-image").src == "http://localhost:5500/assets/diploma.png") {

        document.getElementById("left-image").src = "http://localhost:5500/assets/diplomadark.png";

      }

      else {

        document.getElementById("left-image").src = "http://localhost:5500/assets/diploma.png";

      }

      //Piggybank Image Swap
      if (document.getElementById("piggy").src == "http://localhost:5500/assets/piggy.png") {

        document.getElementById("piggy").src = "http://localhost:5500/assets/piggydark.png";

      }

      else {

        document.getElementById("piggy").src = "http://localhost:5500/assets/piggy.png";

      }

      //Footer Logo Swap
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      else {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

    },

    //Switches Between Dark and Light Mode when opened
    firstTime() {

      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //Main Logo Swap
      if (document.getElementById("Logo").src == "http://localhost:5500/assets/scholarsearch.png") {

        document.getElementById("Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

      else {

        document.getElementById("Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      //Diploma Image Swap
      if (document.getElementById("left-image").src == "http://localhost:5500/assets/diploma.png") {

        document.getElementById("left-image").src = "http://localhost:5500/assets/diplomadark.png";

      }

      else {

        document.getElementById("left-image").src = "http://localhost:5500/assets/diploma.png";

      }

      //Piggybank Image Swap
      if (document.getElementById("piggy").src == "http://localhost:5500/assets/piggy.png") {

        document.getElementById("piggy").src = "http://localhost:5500/assets/piggydark.png";

      }

      else {

        document.getElementById("piggy").src = "http://localhost:5500/assets/piggy.png";

      }

      //Footer Logo Swap
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      else {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

    }

  }

})