//User JSON
const userURL = "http://localhost:8080/user"

//Bookmark JSON
const bookURL = "http://localhost:8080/bookmarks"

//new Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {
    return {
      value: '',
      value3: '',
      themeSwitch: '',
      active: '',
      user: '',
      userInitial: '',
      value7:'',
      bookmarks:[]
    }
  },

  //Created Lifecycle Hook
  created() {

    this.getTheme(),
    //Fetch Specific User using session id
    fetch (userURL + "/" + localStorage.getItem("id"))
     .then (response => {
       return response.json();
     })
     .then (user => {
        this.user = user;

        //gets user's university
        if (this.user.university != "" || this.user.university != null) {
          this.value3 = this.user.university;
        }
        else {
          this.value3 = "University";
        }

        //gets user's discipline
        if (this.user.discipline != "" || this.user.discipline != null) {
          this.value7 = this.user.discipline;
        }
        else {
          this.value7 =  "Discipline";
        }

       //Display User's initals 
       this.userInitial = this.user.name.substring(0,1).toUpperCase();
       var a= this.user.name;
       if (a.indexOf(" ") != -1) {
           this.userInitial += this.user.name.charAt(this.user.name.indexOf(" ") + 1).toUpperCase();
           a="";
         }
     }),

    fetch (bookURL + "/" + localStorage.getItem("id"))
     .then (response => {
       return response.json();
     })
     .then (bookmarks => {
       this.bookmarks = bookmarks;
     })
  },

  //Methods
  methods: {

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
    profileDropdown() {

      document.getElementById("myDropdown").classList.toggle("show");

    },

    //Logout to change status to false
    logout() {

      localStorage.setItem("status", false);

      //switch window
      window.location.replace("http://localhost:5500/pages/index.html");

    },

    /* Getters for User Information in HTML*/

    //get Name
    getUserName() {
      return this.user.name;
    },

    //get Email
    getUserEmail() {
      return this.user.email;
    },

    //get Password
    getUserPassword() {
      return this.user.password;
    },

    //edit Profile to change user information
    editProfile(){

      if (this.value == "") {
        this.value = this.getUserName();
      }

      //patch user information
      fetch(userURL + "/" + localStorage.getItem("id"), {
        method: "PATCH", 
        body: JSON.stringify ({
          id: localStorage.getItem("id"),
          name: this.value,
          email: this.user.email,
          password: this.user.password,
          discipline: this.value7,
          university: this.value3
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then (response => response.json())
      .then (json => console.log(json))
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