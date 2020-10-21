const apiURL = "http://localhost:8080/scholarship"
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
      bookmarked: []
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
      })
  },
  methods: {
    buttonClicked(id) {
      const scholarship = this.scholarships.find(s => s.id === id);
      if (!this.bookmarked[id-1]) {
        scholarship.numBookmarks += 1;
        this.bookmarked[id-1] = true;
      }
      else {
        scholarship.numBookmarks -= 1;
        this.bookmarked[id-1] = false;
      }
      const scholarshipId = "http://localhost:8080/scholarship/" + id;
      fetch(scholarshipId, {
        method: "PATCH",
        body: JSON.stringify ({
          numBookmarks: scholarship.numBookmarks
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      })
      .then (response => response.json())
      .then (json => console.log(json))
    }
  }
});