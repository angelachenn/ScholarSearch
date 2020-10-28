//User JSON
const userURL = "http://localhost:8080/user"

//new Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {
    return {
      value: '',
      value3: '',
      active5: false,
      active: '',
      user: '',
      userInitial: '',
      value7:''
    }
  },

  //Created Lifecycle Hook
  created() {

    //Fetch Specific User using session id
    fetch (userURL + "/" + localStorage.getItem("id"))
     .then (response => {
       return response.json();
     })
     .then (user => {
       this.user = user;

       //Display User's initals 
       this.userInitial = this.user.name.substring(0,1).toUpperCase();
       var a= this.user.name;
       if (a.indexOf(" ") != -1) {
           this.userInitial += this.user.name.charAt(this.user.name.indexOf(" ") + 1).toUpperCase();
           a="";
         }
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

    //get Discipline
    getUserDiscipline() {
      if (this.user.discipline=="null" || this.user.discipline=="" || this.user.discipline == null) {
        return "Discipline";
      } else {
        this.value7 = this.user.discipline;
        return this.user.discipline;
      }
    },

    //get University
    getUserUniversity(){
      if (this.user.university=="null" || this.user.university=="" || this.user.university == null) {
        return "University";
      } else {
        this.value3 = this.user.university; 
        return this.user.university;
      }
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
          discipline: this.value7,
          university: this.value3
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then (response => response.json())
      .then (json => console.log(json))
    }
  }
})