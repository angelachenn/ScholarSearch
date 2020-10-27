const apiURL = "http://localhost:8080/user";
const logURL = "http://localhost:8080";
new Vue({
  el: '#app',
    data() {
      return {
        value: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        active5: false,
        users: [],
        passwordError:'Invalid Password.'
    }
  },
  created() {
    fetch(apiURL)
      .then(response => {
        return response.json();
      })
      .then (users => {
        this.users = users;
      })
  },
  computed: {
    validEmail() {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value);
    },
    validPassword() {

      var verify = 0;

      // at least one number
      if (/\d/.test(this.value5)) {
        this.passwordError = this.passwordError.replace("Please include at least one number.","");
        verify++;
      }
      else {
        if (!this.passwordError.includes("Please include at least one number.")) {
          this.passwordError += " \n Please include at least one number.";
        }
      }

      // at least one capital letter
      if (/(.*[A-Z].*)/.test(this.value5)) {
        this.passwordError = this.passwordError.replace("Please include at least one capital letter.","");
        verify++;
      }
      else {
        if (!this.passwordError.includes("Please include at least one capital letter.")) {
          this.passwordError += " \n Please include at least one capital letter.";
        }
      }
      
      // at least one lowercase later
      if (/(.*[a-z].*)/.test(this.value5)) {
        this.passwordError = this.passwordError.replace("Please include at least one lowercase letter.", "");
        verify++;
      }
      else {
        if (!this.passwordError.includes("Please include at least one lowercase letter.")) {
          this.passwordError += "\n Please include at least one lowercase letter.";
        }
      }
      // at least 5 digits
      if (this.value5.length >= 6) {
        this.passwordError = this.passwordError.replace("Please include at least 5 digits.");
        verify++;
      }
      else {
        if (!this.passwordError.includes("Please include at least 5 digits.")) {
          this.passwordError += "\n Please include at least 5 digits.";
        }
      }
      // at least one special character
      if (/[^A-Za-z0-9]/.test(this.value5)) {
        this.passwordError = this.passwordError.replace("Please include at least one special character.");
        verify++;
      }
      else {
        if (!this.passwordError.includes("Please include at least one special character.")) {
          this.passwordError += "\n Please include at least one special character.";
        }
      }
      return (verify >4);
    },
    validEmail2() {
      var i;
      for (i = 0; i < this.users.length; i++) {
        if (this.users[i].email.toUpperCase() == this.value4.toUpperCase()) {
          return false;
        }
      }
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value4);
    }
  },
  methods:  {
    checkRegistration() {
      if (this.validEmail2 && this.validPassword && this.value3 !="" && this.value6 !="" && this.value7 !="") {
        //user enters all fields

        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length+1,
            name: this.value3,
            password: this.value5,
            email: this.value4,
            university: this.value6,
            discipline: this.value7
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION
        fetch(logURL, {
          method: "PATCH", 
          body: JSON.stringify ({
            id: this.users.length + 1,
            status: true
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
       
        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");

      } else if (this.validEmail2 && this.validPassword && this.value3 !="" && this.value6 !="") {
        //user does not enter discipline field

        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length + 1,
            name: this.value3,
            password: this.value5,
            email: this.value4,
            university: this.value6
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION
        fetch(logURL, {
          method: "PATCH", 
          body: JSON.stringify ({
            id: this.users.length + 1,
            status: true
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
       
        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");
      }  else if (this.validEmail2 && this.validPassword && this.value3 !="" && this.value7 !="") {
        //user doesn't enter university
        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length + 1,
            name: this.value3,
            password: this.value5,
            email: this.value4,
            discipline: this.value7
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION
        fetch(logURL, {
          method: "PATCH", 
          body: JSON.stringify ({
            id: this.users.length + 1,
            status: true
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
       
        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");
      } else if (this.validEmail2 && this.validPassword && this.value3 != ""){
        //user does not enter all fields
        
        //CREATE NEW USER
        fetch(apiURL, {
          method: "POST",
          body: JSON.stringify ({
            id: this.users.length + 1,
            name: this.value3,
            email: this.value4,
            password: this.value5
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))
        
        //CREATE NEW SESSION 
        fetch(logURL, {
          method: "PATCH", 
          body: JSON.stringify ({
            id: this.users.length + 1,
            status: true
          }),
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then (response => response.json())
        .then (json => console.log(json))

        //switch window
        window.location.replace("http://localhost:5500/pages/browse.html");
      } else {
        //edit error message
        document.getElementById("regError").style.display = "block";
      }
    },
    checkLogin() {
      var i;
      for (i = 0; i< this.users.length; i++) {
        if(this.value == this.users[i].email) {
          if (this.value2 == this.users[i].password) {

            fetch(logURL, {
              method: "PATCH",
              body: JSON.stringify ({
                id: this.users[i].id,
                status: true
              }),
              headers: {
                "Content-Type": "application/json; charset=UTF-8"
              }
            })
            .then (response => response.json())
            .then (json => console.log(json))

            window.location.replace("http://localhost:5500/pages/browse.html");
          } else {
            document.getElementById("error").style.display = "block";
          }
        } else {
          document.getElementById("error").style.display = "block";
        }
      }
      return false;
    }
  }
})