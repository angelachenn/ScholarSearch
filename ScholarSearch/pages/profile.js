const logURL = "http://localhost:8080"
const userURL = "http://localhost:8080/user"

new Vue({
  el: '#app',
  data() {
    return {
      value: '',
      value3: '',
      active5: false,
      active: '',
      session: '',
      user: '',
      userInitial: '',
      value7:''
    }
  },
  created() {
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
    },
    getUserName() {
      return this.user.name;
    },
    getUserEmail() {
      return this.user.email;
    },
    getUserPassword() {
      return this.user.password;
    },
    getUserDiscipline() {
      if (this.user.discipline=="null" || this.user.discipline=="") {
        return "Discipline";
      } else {
        return this.user.discipline;
      }
    },
    getUserUniversity(){
      if (this.user.university=="null" || this.user.university=="") {
        return "University";
      } else {
        return this.user.discipline;
      }
    },
    editProfile(){
      fetch(userURL + "/" + this.session.id, {
        method: "PATCH", 
        body: JSON.stringify ({
          id: this.session.id,
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