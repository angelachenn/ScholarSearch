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
      active5: false,
      bookmarked: [],
      scholarshipclicked: 2,
      bookmarks:[],
      newBookmark: '',
      user: '',
      userInitial: ''
    }
  },

  //Created Lifecycle Hook
  created() {

    //Fetch Scholarships
    fetch(apiURL)
      .then(response => {
        return response.json();
      })

      //initialize them all as not being bookmarked
      .then(scholarships => {
        this.scholarships = scholarships;
        var i;
        for ( i = 0; i< this.scholarships.length; i++ ) {
          this.bookmarked[i] = false;
        }
      }),

    
    //Fetch all bookmarks
    fetch(bookURL)
      .then(response => {
        return response.json();
      })
      .then (bookmarks => {
        this.bookmarks = bookmarks;
        var i;

        //If the bookmark element in the array has the same user_id as the current user,
        //change their bookmarked status to "true"
        for (i = 0; i < this.bookmarks.length; i++) {
          if (this.bookmarks[i].userID == localStorage.getItem("id")) {
            this.bookmarked[this.bookmarks[i].scholarshipID-1] = true;
          }
        }
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
        })
    },
  methods: {
    
    buttonClicked(id) {
      //passes in the id (position) of the scholarship the user would like to bookmark
      const scholarship = this.scholarships.find(s => s.id === id);
      //checks to see if any scholarship in the array has the same id as the one pass in
      this.scholarshipclicked = scholarship.id;
     
      //if this is the "first" time the bookmark button is being clicked, 
      //add 1 to the scholarship's bookmark value in the frontend, backend array, and database
      if (!this.bookmarked[id-1]) {
        scholarship.numBookmarks += 1;
        this.bookmarked[id-1] = true;
        
        //Add Bookmark to Database
        fetch (bookURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.bookmarks.length + 1,
            userID: localStorage.getItem("id"),
            scholarshipID: id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //Add bookmark to backend Javascript Array
        this.newBookmark = {id:this.bookmarks.length + 1, userID: localStorage.getItem("id"), scholarshipID:id}
        this.bookmarks.push(this.newBookmark);
      }
      else {
        //If this is the second time the bookmark button is being pressed, subtract 1 from the scholarship's bookmark value
        //in the frontend, backend array, and database
        scholarship.numBookmarks -= 1;
        this.bookmarked[id-1] = false;

        //DELETE Bookmark
        var i;
        var selectedOne=0;

        //If the scholarship id bookmark matches the scholarship's id, and the user's id matches the bookmark's user_id, delete
        for (i = 0; i < this.bookmarks.length; i++) {
          if (this.bookmarks[i].userID == localStorage.getItem("id") && this.bookmarks[i].scholarshipID == id) {
            selectedOne = i+1;
            fetch (bookURL + "/" + selectedOne, {
              method: "DELETE"
            })
          }  
        }
      }

      //fetch the deleted scholarship to refresh number of bookmarks
      const scholarshipId = "http://localhost:8080/scholarship/" + id;
      fetch(scholarshipId, {
        method: "PATCH",
        body: JSON.stringify ({
          numBookmarks: scholarship.numBookmarks
        })
        ,
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then (response => response.json())
      .then (json => console.log(json))
    },

    /* When the user clicks on the button, toggle between hiding and showing the dropdown content */
    profileDropdown() {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    //Logs the user out of the session and reflects this change in the localStorage
    logout() {
      localStorage.setItem("status", false);
      window.location.replace("http://localhost:5500/pages/index.html");
    }
  },
  computed: {
    clicked() {
      return this.bookmarked[this.scholarshipclicked-1];
    }
  } 
});