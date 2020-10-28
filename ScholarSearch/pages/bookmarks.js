//Scholarship JSON
const apiURL = "http://localhost:8080/scholarship"
//User JSON
const userURL = "http://localhost:8080/user"
//Bookmarks JSON
const bookURL = "http://localhost:8080/bookmarks"

//New Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {
    return {
      active: '',
      active5: false,
      bookmarks: [],
      scholarships: [],
      scholarship: '',
      user: '',
      userInitial: ''
    }
  },

  //Created Lifecycle Hooks
  created() {

    //Fetch User Bookmarks
    fetch(bookURL + "/" + localStorage.getItem("id"))
      .then(response => {
        return response.json();
      })
      .then(bookmarks => {
        this.bookmarks = bookmarks;
        
        //Fetch Bookmarked Scholarship Information
        var i;
        for (i=0; i < this.bookmarks.length; i++) {
          fetch (apiURL + "/" + this.bookmarks[i].scholarshipID)
            .then(response => {
              return response.json();
            })
            .then (scholarship => {
              this.scholarship = scholarship;
              //add to array
              this.scholarships.push(this.scholarship);
            })
        }
      }),
    
    //Fetch User Information
    fetch (userURL + "/" + localStorage.getItem("id"))
      .then (response => {
        return response.json();
      })
      .then (user => {

        //Create Initials for User Avatar
        this.user = user;
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

    //Logout to change session 
    logout() {
      localStorage.setItem("status", false);

      //switch window
      window.location.replace("http://localhost:5500/pages/index.html");

    }
  }
});