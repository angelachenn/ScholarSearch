/**
 * Title: bookmarks.js
 * 
 * Javascript for bookmarks.html, used to store data for displaying and interactions
 */

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

      active: '', //navigation
      themeSwitch: '', //value for switch
      bookmarks: [], //bookmarks by user
      scholarships: [], //scholarships
      scholarship: '', //specifc scholarship to add into scholarships
      user: '', //User Information
      userInitial: '', //User's name initials for avatar
      index:'' //index for scholarship in array

    }

  },

  //Created Lifecycle Hooks
  created() {

    this.getTheme();

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
      window.location.replace("/index.html");

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
      if (document.getElementById("Footer-Logo").src == "/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "/assets/scholarsearch.png";

      }
      else {

        document.getElementById("Footer-Logo").src = "/assets/darkmodelogo.png";

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
      if (document.getElementById("Footer-Logo").src == "https://friendly-bell-b1c52f.netlify.app/assets/darkmodelogo.png") {

        document.getElementById("Footer-Logo").src = "https://friendly-bell-b1c52f.netlify.app/assets/scholarsearch.png";

      }
      else {

        document.getElementById("Footer-Logo").src = "https://friendly-bell-b1c52f.netlify.app/assets/darkmodelogo.png";

      }

    },

    //Deletes Bookmark
    deleteBookmark(id) {

      const scholarship = this.scholarships.find(s => s.id === id);
      this.index = this.setIndex(scholarship);


      //change numBookmarks for scholarship in javascript
      this.scholarships[this.index].numBookmarks -=1;

      //change numBookmarks for scholarship in java+database
      const scholarshipId = "http://localhost:8080/scholarship/" + id;

      fetch(scholarshipId, {
        method: "PATCH",
        body: JSON.stringify ({
          numBookmarks: this.scholarships[this.index].numBookmarks
        })
        ,
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then (response => response.json())
      .then (json => console.log(json))

      //after removing bookmark, all ids after bookmark need to shift down to keep things coherent
      for (var i = 0; i <this.bookmarks.length; i++) {

        if (scholarship.id == this.bookmarks[i].scholarshipID && parseInt(localStorage.getItem("id")) == this.bookmarks[i].userID) {

          this.bookmarks.splice(i,1); //delete bookmark in javascript

          //delete bookmark in java
          fetch (bookURL + "/" + (i+1), {
            method: "DELETE"
          })

          //change id of bookmarks in javascript
          for (var j = i; j <this.bookmarks.length; j++){

            this.bookmarks[j].id -=1;
            
              //change id of bookmarks in java
              fetch(bookURL + "/" + (j+2), {
              method: "PATCH",
              body: JSON.stringify ({
                id: this.bookmarks[j].id
              })
              ,
              headers: {
                "Content-Type": "application/json; charset=UTF-8"
              }
            })
            .then (response => response.json())
            .then (json => console.log(json))
          } 

          break;
        }

      }

      location.reload();
    },

    //when a scholarship is clicked, finds index in array
    setIndex(scholarship) {

    for (var i = 0; i < this.scholarships.length; i++){

      if (scholarship.id == this.scholarships[i].id) {

        return i;

      }

    }

    return 0;

    },

    expand(scholarshipid){

      const scholarship = this.scholarships.find(s => s.id === scholarshipid);
      localStorage.setItem("scholarship", scholarship.id);
      window.location.href ="/scholarship.html";

    }

  }

});
