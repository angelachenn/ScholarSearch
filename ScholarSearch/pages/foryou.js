//User JSON
userURL = "http://localhost:8080/user"

//Vue Instance
new Vue({
    el: '#app',
      data: () => ({
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      active5: false,
      active: '',
      themeSwitch:'',
      user: '',
      userInitial: ''
    }),

    //Created Lifecycle Hook
    created() {
      this.getTheme();
      //Fetch logged in user's information
      fetch (userURL + "/" + localStorage.getItem("id"))
        .then (response => {
          return response.json();
        })

        //Use the user's name to create an initial to display on the avatar button
        .then (user => {
          this.user = user;
          this.userInitial = this.user.name.substring(0,1).toUpperCase();
          var a= this.user.name;

          //If there is a space in their name (ex. user entered first and last name) make another initial for their last name
          if (a.indexOf(" ") != -1) {
              this.userInitial += this.user.name.charAt(this.user.name.indexOf(" ") + 1).toUpperCase();
              a="";
            }
        })
      },
    methods: {
    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
      profileDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
      },

      //Logs the user out of the session and reflects this change in the localStorage
      logout() {
        localStorage.setItem("status", false);
        window.location.replace("http://localhost:5500/pages/index.html");
      },

      //Switches Between Light Mode and Dark Mode
    theme() {
      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //LocalStorage Switches
      if(localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
      }
      else if (localStorage.getItem("theme") ==  "dark") {
        localStorage.setItem("theme", "light");
      }

      //Swap Footer Logo
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {
        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";
      }
      else {
        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";
      }

    },

    //Retrieves User's choice of Theme
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

    //Sets theme when first opened
    firstTime() {
      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //Swap Footer Logo
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {
        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";
      }
      else {
        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";
      }
    }
  }
})