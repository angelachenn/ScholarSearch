/**
 * Title: browse.js
 * 
 * Javascript for browse.html, used to store data for displaying and interactions
 */

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

      scholarships:[], //scholarships to display
      searchQuery: '', //value from search
      sorting: 'Alphabetical', //value from sorting
      filterUniversity: [], //value from filtering university
      filterDiscipline: [], //value from filtering discipline
      filterRenewable: [], //value from filtering renewable
      filterLevel: [], //value from filtering level
      filterSupplemental: [], //value from filtering supplemental
      active: '', //navigation
      themeSwitch: false, //value from switch
      bookmarked: [], //boolean array if scholarship has been bookmarked by the user
      scholarshipclicked: 2, //id of scholarship clicked
      bookmarks:[], //bookmarks by user
      newBookmark: '', //Bookmark object of new bookmark to add
      user: '', //user information
      userInitial: '', //Initials for user's name
      index: '', //index of scholarship in array
      dynamicArray: [], //scholarships array that is displayed
      thirdArray: [] //scholarship array that is being sorted, searched, and filtered from

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
        fetch (apiURL)
          .then (response => {
            return response.json();
          })
          .then (scholarships => {
            this.scholarships = scholarships;
            this.dynamicArray = this.scholarships;
            this.thirdArray = this.scholarships;

            /*
            This is used to initalize the bookmarked array, which identifies whether the user has bookmarked a scholarship before or not
            We go through the scholarship array and bookmark array to find matching ones, to set to true, if none is found, it is false
            */
            for (var i = 0; i < this.scholarships.length; i++) {

              for (var j = 0; j<this.bookmarks.length; j++) {

                //same user id and same scholarship id makes bookmarked true, aids in initializing the bookmark icon as full.
                if (this.scholarships[i].id == this.bookmarks[j].scholarshipID && this.bookmarks[j].userID == parseInt(localStorage.getItem("id"))) {

                  this.bookmarked[i] = true;
                  break;

                }

                //else, initialize the boolean array to false, which will aid in initializing the bookmark icon as empty.
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
    
    //sets theme for user
    this.getTheme();
  },

  //methods
  methods: {
    
    //when a scholarship is clicked, finds index in array
    setIndex(scholarship) {

      for (var i = 0; i < this.scholarships.length; i++){

        if (scholarship.id == this.scholarships[i].id) {

          return i;

        }

      }

      return 0;

    },

    
    //when a bookmark is clicked
    buttonClicked(id) {
      //passes in the id (position) of the scholarship the user would like to bookmark
      const scholarship = this.scholarships.find(s => s.id === id);
      //checks to see if any scholarship in the array has the same id as the one pass in
      this.scholarshipclicked = scholarship.id;
      
      //sets "index" variable by passing in the id (position) of the scholarship the user would like to bookmark
      this.index = this.setIndex(scholarship);
      
      //if the bookmark has been clicked or not, false means add bookmark, true means remove bookmark
      if (!this.bookmarked[this.index]) {
        
        //change scholarship numBookmarks in javascript
        this.scholarships[this.index].numBookmarks += 1;
      
        //change scholarship numBookmarks in java, calls the JSON of the scholarship based on ID
        const scholarshipId = "http://localhost:8080/scholarship/" + id;
        
        //patches/updates the number of bookmarks that the specific bookmark has
        fetch(scholarshipId, {
          method: "PATCH",
          body: JSON.stringify ({
            numBookmarks: this.scholarships[this.index].numBookmarks
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //add bookmark to bookmark array in javascript
        this.newBookmark = {id:this.bookmarks.length + 1, userID: parseInt(localStorage.getItem("id")), scholarshipID:id};
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
        this.bookmarked[this.index] = true;
      }

      else {

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

    //Filters Everything After Filter Change
    mainFilter() {

      /*It first filters through university, adding matching scholarships from this.scholarships
      to this.dynamicArray. After this however, all filters will be based on the resultant array so we created thirdArray
      to filter from afterwards.*/

      //UNIVERSITY

      //sets dynamicArray empty so it can add only matching scholarships
      this.dynamicArray = [];
      //makes sure if a filter is set
      if (this.filterUniversity.length != 0) {

        //goes through filters selected
        for (var i=0; i<this.filterUniversity.length; i++) {

          //goes through all scholarships and adds them to dynamicArray if they match query
          for (var j = 0; j < this.thirdArray.length; j++) {

            if (this.filterUniversity[i] == this.thirdArray[j].university) {

              this.dynamicArray.push(this.thirdArray[j]);

            }

          }

        }

      }

      else {

        this.dynamicArray = this.thirdArray.slice(0); //since no filters are set, dynamicArray is set to scholarships

      }

      //thirdArray is set to dynamicArray to filter from in the future
      this.thirdArray = this.dynamicArray.slice(0);
      //sets dynamicArray empty for next filter
      this.dynamicArray = [];

      //DISCIPLINE
      //same process as above for filtering by university, but this time taking the already filtered array and narrowing it down even more
      if (this.filterDiscipline.length != 0) {

        for (var i = 0; i < this.filterDiscipline.length; i++) {

          for (var j = 0; j < this.thirdArray.length; j++) {

            if (this.filterDiscipline[i] == this.thirdArray[j].discipline) {

              this.dynamicArray.push(this.thirdArray[j]);

            }

          }

        }

      }

      else {

        this.dynamicArray = this.thirdArray.slice(0);

      }

      this.thirdArray = this.dynamicArray.slice(0);
      this.dynamicArray = [];  

      //RENEWABLE
      if (this.filterRenewable.length != 0) {

        for (var i = 0; i < this.filterRenewable.length; i++) {

          for (var j = 0; j < this.thirdArray.length; j++) {

            if (this.filterRenewable[i] == this.thirdArray[j].renewable) {

              this.dynamicArray.push(this.thirdArray[j]);

            }

          }

        }

      }

      else {

        this.dynamicArray = this.thirdArray.slice(0);

      }

      this.thirdArray = this.dynamicArray.slice(0);
      this.dynamicArray = [];

      //LEVEL
      if (this.filterLevel.length != 0) {

        for (var i = 0; i < this.filterLevel.length; i++) {

          for (var j = 0; j < this.thirdArray.length; j++) {

            if (this.filterLevel[i] == this.thirdArray[j].level) {

              this.dynamicArray.push(this.thirdArray[j]);

            }

          }

        }

      }

      else {

        this.dynamicArray = this.thirdArray.slice(0);

      }
      
      this.thirdArray = this.dynamicArray.slice(0);
      this.dynamicArray = [];
      
      //SUPPLEMENTAL
      if (this.filterSupplemental.length != 0) {

        for (var i = 0; i < this.filterSupplemental.length; i++) {

          for (var j = 0; j < this.thirdArray.length; j++) {

            if (this.filterSupplemental[i] == this.thirdArray[j].supplemental) {

              this.dynamicArray.push(this.thirdArray[j]);

            }

          }

        }

      }

      else {

        this.dynamicArray = this.thirdArray.slice(0);

      }

      //Sort
      this.sortArray();
    },

    //Sorts Array based on Preference
    sortArray() {

      //Switch For Different Sorting Strings
      switch(this.sorting) {

        //Sort By Closest Deadline
        case "Closest Deadline":
          
          //Gets Current Date
          var cDate = new Date();

          //Bubble Sort to Sort Array
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {

              
              //Compares Months of Deadlines, and puts No Deadline at end of array
              if (Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j].date.substring(5,7))) < Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j + 1].date.substring(5,7))) || this.dynamicArray[j].date == "No Deadline") {
                
                var temp = this.dynamicArray[j + 1];
                this.dynamicArray[j + 1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

              //If Months are Same, compares day
              else if(Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j].date.substring(5,7))) == Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j + 1].date.substring(5,7)))) {
                
                if (Math.abs(cDate.getDate() - parseInt(this.dynamicArray[j].date.substring(8))) > Math.abs((cDate.getDate()) - parseInt(this.dynamicArray[j + 1].date.substring(8)))) {
                  
                  var temp = this.dynamicArray[j + 1];
                  this.dynamicArray[j + 1] = this.dynamicArray[j];
                  this.dynamicArray[j] = temp;

                }

              }

            }

          }

          break;
        
        //Sorts By Furthest Deadline
        case "Furthest Deadline":

          //retrieves the current date and assigns it to the cDate variable
          var cDate = new Date();
          
          //bubble sort to sort the array
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {


              //checks to if see the MAGNITUDE/distance between deadline month and current month is greater or lesser between the 2 current elements
              if (Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j].date.substring(5,7))) > Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j + 1].date.substring(5,7))) || this.dynamicArray[j+1].date == "No Deadline") {
                
                var temp = this.dynamicArray[j + 1];
                this.dynamicArray[j + 1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

              //if months are equal, check the deadline and current Date
              else if(Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j].date.substring(5,7))) == Math.abs((cDate.getMonth() + 1) - parseInt(this.dynamicArray[j + 1].date.substring(5,7)))) {
                
                if (Math.abs(cDate.getDate() - parseInt(this.dynamicArray[j].date.substring(8))) < Math.abs((cDate.getDate()) - parseInt(this.dynamicArray[j + 1].date.substring(8)))) {
                 
                  var temp = this.dynamicArray[j + 1];
                  this.dynamicArray[j + 1] = this.dynamicArray[j];
                  this.dynamicArray[j] = temp;

                }

              }

            }

          }

          break;

        //Sorts By Highest Value
        case "Highest Value":

        //Bubble Sort
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {

              //Swaps if Value is Higher
              if (this.dynamicArray[j].value < this.dynamicArray[j+1].value) {

                var temp = this.dynamicArray[j+1];
                this.dynamicArray[j+1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

            }

          }

          break;
          
        //Sorts By Lowest Value
        case "Lowest Value":
          
          //Bubble Sort
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {


              //Swaps if Value is Lower
              if (this.dynamicArray[j].value > this.dynamicArray[j+1].value) {

                var temp = this.dynamicArray[j+1];
                this.dynamicArray[j+1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

            }

          }

          break;

        //Sorts by Most Bookmarks
        case "Highest Popularity":

          //Bubble Sort
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {
              
              //Swaps if numBookmarks is Higher
              if (this.dynamicArray[j].numBookmarks < this.dynamicArray[j+1].numBookmarks) {

                var temp = this.dynamicArray[j+1];
                this.dynamicArray[j+1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

            }

          }

          break;
        
        //Sorts by least amount of bookmarks
        case "Lowest Popularity":
          
        //Swaps if numBookmarks is lower
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {

              if (this.dynamicArray[j].numBookmarks > this.dynamicArray[j+1].numBookmarks) {

                var temp = this.dynamicArray[j+1];
                this.dynamicArray[j+1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

            }

          }

          break;
          
        //Sorts by University Name, then Scholarship Name
        case "Alphabetical":
          
          //Bubble Sort
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {
              
              //Compares University Name
              if (this.dynamicArray[j].university.localeCompare(this.dynamicArray[j + 1].university) > 0) {

                var temp = this.dynamicArray[j + 1];
                this.dynamicArray[j + 1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

              else if (this.dynamicArray[j].university.localeCompare(this.dynamicArray[j + 1].university) == 0){
                
                //Compares Scholarship Name
                if (this.dynamicArray[j].name.localeCompare(this.dynamicArray[j + 1].name) > 0) {

                  var temp = this.dynamicArray[j + 1];
                  this.dynamicArray[j + 1] = this.dynamicArray[j];
                  this.dynamicArray[j] = temp;

                }

              }

            }

          }

          break;
        
        //Sorts by highest amount of spots available (Scholarships with unlimited spots will show up at the top)
        case "Highest Availability":
          //bubble sort
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {

              //Compares numSpots, swaps if higher
              if (this.dynamicArray[j].numSpots < this.dynamicArray[j+1].numSpots || this.dynamicArray[j+1].numSpots == "Unlimited") {
                
                var temp = this.dynamicArray[j+1];
                this.dynamicArray[j+1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

            }

          }

          break;
        
        //Sorts by lowest amount of spots available (Scholarships with unlimited spots will be shown at the bottom)
        case "Lowest Availability":

          //Bubble Sort
          for (var i = 0; i < this.dynamicArray.length; i++) {

            for (var j = 0; j < this.dynamicArray.length - 1; j++) {


              //Swaps if numSpots is lower or if numSpots is unlimited
              if (this.dynamicArray[j].numSpots > this.dynamicArray[j+1].numSpots || this.dynamicArray[j].numSpots == "Unlimited") {

                var temp = this.dynamicArray[j+1];
                this.dynamicArray[j+1] = this.dynamicArray[j];
                this.dynamicArray[j] = temp;

              }

            }

          }

          break;
      }
    },

    //searchArray is used to search between scholarships, which then calls mainFilter() to filter and then sort
    searchArray() {

      
      this.dynamicArray = [];

      if (this.searchQuery != "") {

        //Goes Through Array to check if scholarship contains search query
        for (var i = 0; i < this.scholarships.length; i++) {

          if((this.scholarships[i].name.toUpperCase().includes(this.searchQuery.toUpperCase())) || (this.scholarships[i].university.toUpperCase().includes(this.searchQuery.toUpperCase()))) {
            
            this.dynamicArray.push(this.scholarships[i]);

          }

        }

      }

      else {

        this.dynamicArray = this.scholarships.slice(0);

      }

      this.thirdArray = this.dynamicArray.slice(0);
      this.mainFilter();

    },

    expand(scholarshipid){

      const scholarship = this.scholarships.find(s => s.id === scholarshipid);
      localStorage.setItem("scholarship", scholarship.id);
      window.location.href = ("scholarship.html");

    }

  },

  //methods that run when any change in value of a specific variable has been detected
  watch: {

    //university filter is changed
    filterUniversity: function() {

      this.searchArray();

    },

    //discipline filter is changed
    filterDiscipline: function() {

      this.searchArray();

    },
    
    //renewable filter is changed
    filterRenewable: function() {

      this.searchArray();

    },

    //level filter is changed
    filterLevel: function() {

      this.searchArray();

    },

    //supplemental filter is changed
    filterSupplemental: function() {

      this.searchArray();

    },

    //sorting is changed
    sorting: function() {

      this.sortArray();

    },

  }

});
