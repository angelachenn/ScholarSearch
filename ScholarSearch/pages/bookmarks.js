const apiURL = "http://localhost:8080/scholarship"
const logURL = "http://localhost:8080"
const userURL = "http://localhost:8080/user"
new Vue({
    el: '#app',
      data: () => ({
      active: '',
      active5: false,
      bookmarked: [],
      scholarships: [],
      session: '',
      user: '',
      userInitial: 'P'
    }),
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
    }
  });