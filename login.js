/**
 * Title: login.js
 * 
 * Javascript for login.html, used to store data for displaying and interactions
 */

//User JSON
const apiURL = "http://localhost:8080/user";

//Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {

    return {

      value: '', //login email
      value2: '', //login password
      value3: '', //Name for Register
      value4: '', //Email for Register
      value5: '', //Password for Register
      value6: '', //University for Register
      value7: '', //Discipline for Register
      themeSwitch: '', //value for switch
      users: [], //users
      passwordError:'Invalid Password.' //error message for password

    }

  },

  //Created Lifecycle Hook
  created() {

    this.getTheme();

    //Fetch User Information
    fetch(apiURL)
      .then(response => {
        return response.json();
      })
      .then (users => {
        this.users = users;
      })
  },

  //Live Methods Running
  computed: {

    //Uses Regex to check if email is valid for login
    validEmail() {

      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value);

    },

    //Users Tegex to check if password is valid for register
    validPassword() {

      var verify = 0;

      // at least one number
      if (/\d/.test(this.value5)) {

        this.passwordError = this.passwordError.replace("Please include at least one number.","");
        verify++;

      }

      else {

        if (!this.passwordError.includes("Please include at least one number.")) {

          this.passwordError += " \n Please include at least one number.";

        }

      }

      // at least one capital letter
      if (/(.*[A-Z].*)/.test(this.value5)) {

        this.passwordError = this.passwordError.replace("Please include at least one capital letter.","");
        verify++;

      }

      else {

        if (!this.passwordError.includes("Please include at least one capital letter.")) {

          this.passwordError += " \n Please include at least one capital letter.";

        }

      }
      
      // at least one lowercase later
      if (/(.*[a-z].*)/.test(this.value5)) {
        
        this.passwordError = this.passwordError.replace("Please include at least one lowercase letter.", "");
        verify++;

      }

      else {

        if (!this.passwordError.includes("Please include at least one lowercase letter.")) {

          this.passwordError += "\n Please include at least one lowercase letter.";

        }

      }

      // at least 5 digits
      if (this.value5.length >= 6) {
        
        this.passwordError = this.passwordError.replace("Please include at least 5 digits.");
        verify++;

      }

      else {
        
        if (!this.passwordError.includes("Please include at least 5 digits.")) {

          this.passwordError += "\n Please include at least 5 digits.";

        }

      }

      // at least one special character
      if (/[^A-Za-z0-9]/.test(this.value5)) {

        this.passwordError = this.passwordError.replace("Please include at least one special character.");
        verify++;

      }

      else {

        if (!this.passwordError.includes("Please include at least one special character.")) {

          this.passwordError += "\n Please include at least one special character.";

        }

      }

      return (verify >4);

    },

    //Uses Regex to check if email is valid for register
    validEmail2() {

      var i;
      for (i = 0; i < this.users.length; i++) {

        if (this.users[i].email.toUpperCase() == this.value4.toUpperCase()) {

          return false;

        }

      }

      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value4);

    }

  },

  //Methods
  methods:  {

    //Retrieve user's preferred theme
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

    firstTime() {

      document.body.classList.toggle('dark-theme'); //Class to change all elements

      //Logo Swap
      if (document.getElementById("Footer-Logo").src == "http://localhost:5500/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

      else {

        document.getElementById("Footer-Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

    },

    //Switches Between Light and Dark Mode
    theme() {

      document.body.classList.toggle('dark-theme');

      //LocalStorage Switches
      if(localStorage.getItem("theme") == "light") {
        
        localStorage.setItem("theme", "dark");

      }

      else if (localStorage.getItem("theme") ==  "dark") {

        localStorage.setItem("theme", "light");

      }

      //Logo Swap
      if (document.getElementById("Logo").src == "http://localhost:5500/assets/scholarsearch.png") {

        document.getElementById("Logo").src = "http://localhost:5500/assets/darkmodelogo.png";

      }

      else {

        document.getElementById("Logo").src = "http://localhost:5500/assets/scholarsearch.png";

      }

    },
    //Checks for Valid Register and Builds New User
    checkRegistration() {

      //user enters all fields
      if (this.validEmail2 && this.validPassword && this.value3 !="" && this.value6 !="" && this.value7 !="") {

        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length+1,
            name: this.value3,
            password: this.value5,
            email: this.value4,
            university: this.value6,
            discipline: this.value7
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //CREATE NEW SESSION
        localStorage.setItem("id", this.users.length + 1);
        localStorage.setItem("status", true);

        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");

      } else if (this.validEmail2 && this.validPassword && this.value3 !="" && this.value6 !="") {
        //user does not enter discipline field^

        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length + 1,
            name: this.value3,
            password: this.value5,
            email: this.value4,
            university: this.value6
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION
        localStorage.setItem("id", this.users.length + 1);
        localStorage.setItem("status", true);
        
        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");

      }  else if (this.validEmail2 && this.validPassword && this.value3 !="" && this.value7 !="") {
        //user doesn't enter university^

        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length + 1,
            name: this.value3,
            password: this.value5,
            email: this.value4,
            discipline: this.value7
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION
        localStorage.setItem("id", this.users.length + 1);
        localStorage.setItem("status", true);
        
        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");

      } else if (this.validEmail2 && this.validPassword && this.value3 != ""){
        //user does not enter all fields^
        
        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length + 1,
            name: this.value3,
            email: this.value4,
            password: this.value5
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION
        localStorage.setItem("id", this.users.length + 1);
        localStorage.setItem("status", true);
        
        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");

      } else {

        //error message
        document.getElementById("regError").style.display = "block";

      }
    },

    //Checks for Valid Login and alters session
    checkLogin() {

      var i;

      //Checks if email exists and if password matches
      for (i = 0; i< this.users.length; i++) {

        if(this.value == this.users[i].email) {
          
          if (this.value2 == this.users[i].password) {

            //Logged in with user id saved to browser
            localStorage.setItem("id", this.users[i].id);
            localStorage.setItem("status", true);
            
            //switch window
            window.location.replace("http://localhost:5500/pages/browse.html");

          } else {

            //error message
            document.getElementById("error").style.display = "block";

          }

        } else {

          //error message
          document.getElementById("error").style.display = "block";

        }

      }

      return false;

    }

  }

})