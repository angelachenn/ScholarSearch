//Scholarships JSON
const apiURL = "http://localhost:8080/scholarship"
//Bookmarks JSON
const bookURL = "http://localhost:8080/bookmarks"
//User JSON
const userURL = "http://localhost:8080/user"

//Vue Instance
new Vue({
  el: '#app',

  //Variables
  data() {
    return {
      scholarships:[],
      value: '',
      value2: '',
      value3: '',
      value4:'',
      value5: '',
      value6: '',
      active: '',
      themeSwitch: false,
      bookmarked: [],
      scholarshipclicked: 2,
      bookmarks:[],
      session: '',
      newBookmark: '',
      user: '',
      userInitial: '',
      index: ''
    }
  },

  //Created Lifecycle Hook
  created() {
    fetch (bookURL)
      .then (response => {
        return response.json();
      })
      .then (bookmarks => {
        this.bookmarks = bookmarks;

        fetch (apiURL)
          .then (response => {
            return response.json();
          })
          .then (scholarships => {
            this.scholarships = scholarships;

            for (var i = 0; i < this.scholarships.length; i++) {
              for (var j = 0; j<this.bookmarks.length; j++) {
                if (this.scholarships[i].id == this.bookmarks[j].scholarshipID && this.bookmarks[j].userID == parseInt(localStorage.getItem("id"))) {
                  this.bookmarked[i] = true;
                  break;
                }
                else {
                  this.bookmarked[i] =  false;
                }
              }
            }
          })
      }),
    //Fetch the logged-in user's information
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
      }),
    this.getTheme();
   },
  methods: {

    setIndex(scholarship) {
      for (var i = 0; i < this.scholarships.length; i++){
        if (scholarship.id == this.scholarships[i].id) {
          return i;
        }
      }
      return 0;
    },
    
    buttonClicked(id) {
      //passes in the id (position) of the scholarship the user would like to bookmark
      const scholarship = this.scholarships.find(s => s.id === id);
      //checks to see if any scholarship in the array has the same id as the one pass in
      this.scholarshipclicked = scholarship.id;

      this.index = this.setIndex(scholarship);

      if (!this.bookmarked[this.index]) {
        
        //change scholarships in javascript
        this.scholarships[this.index].numBookmarks += 1;
        //scholarship.numBookmarks += 1;
      
        //change scholarships in java
        const scholarshipId = "http://localhost:8080/scholarship/" + id;
        fetch(scholarshipId, {
          method: "PATCH",
          body: JSON.stringify ({
            numBookmarks: this.scholarships[this.index].numBookmarks
            //numBookmarks: scholarship.numBookmarks
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //change bookmarks in javascript
        this.newBookmark = {id:this.bookmarks.length + 1, userID: parseInt(localStorage.getItem("id")), scholarshipID:id};
        this.bookmarks.push(this.newBookmark);

        //change bookmarks in java
        fetch (bookURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.newBookmark.id,
            userID: this.newBookmark.userID,
            scholarshipID: this.newBookmark.scholarshipID
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //change bookmarked
        this.bookmarked[this.index] = true;
      }
      else {
        //change scholarships in javascript
        this.scholarships[this.index].numBookmarks -=1;
        //scholarship.numBookmarks -=1;

        //change scholarships in java
        const scholarshipId = "http://localhost:8080/scholarship/" + id;
        fetch(scholarshipId, {
          method: "PATCH",
          body: JSON.stringify ({
            numBookmarks: this.scholarships[this.index].numBookmarks
            //numBookmarks: scholarship.numBookmarks
          })
          ,
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        for (var i = 0; i <this.bookmarks.length; i++) {
          if (scholarship.id == this.bookmarks[i].scholarshipID && parseInt(localStorage.getItem("id")) == this.bookmarks[i].userID) {

            this.bookmarks.splice(i,1); //delete bookmark in javascript

            //delete bookmark in java
            fetch (bookURL + "/" + (i+1), {
              method: "DELETE"
            })

            //change index of bookmarks in javascript
            for (var j = i; j <this.bookmarks.length; j++){
              this.bookmarks[j].id -=1;
              
                //change index of bookmarks in java
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
        //change bookmarked
        this.bookmarked[this.index] = false;
      }
    },

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
});