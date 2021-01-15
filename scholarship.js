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
      scholarship:'',
      active: '',
      themeSwitch: false,
      bookmarked: '',
      scholarshipclicked: 2,
      bookmarks: [],
      newBookmark: '',
      user: '',
      userInitial: '',
      index: ''
    } 
  },

  //Created Lifecycle Hook
  created() {
    //Fetch Bookmarks
    fetch (bookURL)
      .then (response => {
        return response.json();
      })
      .then (bookmarks => {
        this.bookmarks = bookmarks;

        //Fetch Scholarships
        fetch (apiURL + "/" + localStorage.getItem("scholarship"))
          .then (response => {
            return response.json();
          })
          .then (scholarship => {
            this.scholarship = scholarship;

            /*
            This is used to initalize the bookmarked array, which identifies whether the user has bookmarked a scholarship before or not
            We go through the scholarship array and bookmark array to find matching ones, to set to true, if none is found, it is false
            */
              for (var j = 0; j<this.bookmarks.length; j++) {
                //same user id and same scholarship id makes bookmarked true, aids in initializing the bookmark icon as full.
                if (this.scholarship.id == this.bookmarks[j].scholarshipID && this.bookmarks[j].userID == parseInt(localStorage.getItem("id"))) {
                  this.bookmarked = true;
                  break;
                }
                //else, initialize the boolean array to false, which will aid in initializing the bookmark icon as empty.
                else {
                  this.bookmarked =  false;
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
    
    //sets theme for user
    this.getTheme();
  },

  //methods
  methods: {
    //when a bookmark is clicked
    buttonClicked() {
      
      //if the bookmark has been clicked or not, false means add bookmark, true means remove bookmark
      if (!this.bookmarked) {
        
        //change scholarship numBookmarks in javascript
        this.scholarship.numBookmarks += 1;
      
        //change scholarship numBookmarks in java, calls the JSON of the scholarship based on ID
        const scholarshipId = "http://localhost:8080/scholarship/" + this.scholarship.id;
        
        //patches/updates the number of bookmarks that the specific bookmark has
        fetch(scholarshipId, {
          method: "PATCH",
          body: JSON.stringify ({
            numBookmarks: this.scholarship.numBookmarks
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //add bookmark to bookmark array in javascript
        this.newBookmark = {id:this.bookmarks.length + 1, userID: parseInt(localStorage.getItem("id")), scholarshipID:this.scholarship.id};
        this.bookmarks.push(this.newBookmark);

        //adds bookmark to java array
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
        this.bookmarked = true;
      }
      else {
        //change numBookmarks for scholarship in javascript
        this.scholarship.numBookmarks -=1;

        //change numBookmarks for scholarship in java+database
        const scholarshipId = "http://localhost:8080/scholarship/" + this.scholarship.id;
        fetch(scholarshipId, {
          method: "PATCH",
          body: JSON.stringify ({
            numBookmarks: this.scholarship.numBookmarks
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
          if (this.scholarship.id == this.bookmarks[i].scholarshipID && parseInt(localStorage.getItem("id")) == this.bookmarks[i].userID) {

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
        //change bookmarked
        this.bookmarked = false;
      }
    },

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
    profileDropdown() {
      document.getElementById("myDropdown").classList.toggle("show");
    },
    //Logs the user out of the session and reflects this change in the localStorage
    logout() {
      localStorage.setItem("status", false);
      window.location.replace("index.html");
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
      if (document.getElementById("Footer-Logo").src == "https://friendly-bell-b1c52f.netlify.app/assets/darkmodelogo.png") {
        document.getElementById("Footer-Logo").src = "https://friendly-bell-b1c52f.netlify.app/assets/scholarsearch.png";
      }
      else {
        document.getElementById("Footer-Logo").src = "https://friendly-bell-b1c52f.netlify.app/assets/darkmodelogo.png";
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

    redirect() {
        window.open(this.scholarship.link, '_blank');
    },

    goBack() {
        window.history.back();
    }
  }
});
