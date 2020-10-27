const apiURL = "http://localhost:8080/scholarship"
const logURL = "http://localhost:8080"
const bookURL = "http://localhost:8080/bookmarks"
const userURL = "http://localhost:8080/user"

new Vue({
  el: '#app',
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
      session: '',
      newBookmark: '',
      user: '',
      userInitial: ''
    }
  },
  created() {
    fetch(apiURL)
      .then(response => {
        return response.json();
      })
      .then(scholarships => {
        this.scholarships = scholarships;
        var i;
        for ( i = 0; i< this.scholarships.length; i++ ) {
          this.bookmarked[i] = false;
        }
      }),
    fetch(bookURL)
      .then(response => {
        return response.json();
      })
      .then (bookmarks => {
        this.bookmarks = bookmarks;
      }),
    fetch (logURL)
      .then(response => {
        return response.json();
      })
      .then (session => {
        this.session = session;
        fetch (userURL + "/" + this.session.id)
          .then (response => {
            return response.json();
          })
          .then (user => {
            this.user = user;
            this.userInitial = this.user.name.substring(0,1).toUpperCase();
            var a= this.user.name;
            if (a.indexOf(" ") != -1) {
                this.userInitial += this.user.name.charAt(this.user.name.indexOf(" ") + 1).toUpperCase();
                a="";
              }
          })
      })
    },
  methods: {
    buttonClicked(id) {
      const scholarship = this.scholarships.find(s => s.id === id);
      this.scholarshipclicked = scholarship.id;
      if (!this.bookmarked[id-1]) {
        scholarship.numBookmarks += 1;
        this.bookmarked[id-1] = true;
        //ADD Bookmark
        fetch (bookURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.bookmarks.length + 1,
            userID: this.session.id,
            scholarshipID: id
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        this.newBookmark = {id:this.bookmarks.length + 1, userID: this.session.id, scholarshipID:id}
        this.bookmarks.push(this.newBookmark);
      }
      else {
        scholarship.numBookmarks -= 1;
        this.bookmarked[id-1] = false;
        //DELETE Bookmark
        var i;
        var selectedOne=0;
        for (i = 0; i < this.bookmarks.length; i++) {
          if (this.bookmarks[i].userID == this.session.id && this.bookmarks[i].scholarshipID == id) {
            selectedOne = i+1;
            fetch (bookURL + "/" + selectedOne, {
              method: "DELETE"
            })
          }  
        }
      }
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
    logout() {
      fetch(logURL, {
        method: "PATCH",
        body: JSON.stringify ({
          status: false
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then (response => response.json())
      .then (json => console.log(json))

      window.location.replace("http://localhost:5500/pages/index.html");
    }
  },
  computed: {
    clicked() {
      return this.bookmarked[this.scholarshipclicked-1];
    }
  } 
});