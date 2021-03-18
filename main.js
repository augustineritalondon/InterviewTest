new Vue({
  el: "#app",
  data: {
    users: [],
    page: [],
    perma: [],
    perPage: 4,
    currentPage: 0,
    maxPages: 0,
    toggle: false,
    searchValue: "",
  },
  methods: {
    fetchAll: function () {
      return fetch('https://randomuser.me/api/?results=50')
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.results);
          this.perma = data.results; // all permanent user data
          this.users = data.results; // all user data
          this.maxPages = this.calcMaxPages() // calculate maximum pages for pagination
        });
    },
    
    next: function () {
      if ((this.currentPage + 1) >= this.calcMaxPages()) return; // to prevent forward if at the end of the user list
      this.currentPage = this.currentPage + 1; // counter
      this.page = this.users.slice(this.currentPage * this.perPage, (this.currentPage * this.perPage) + this.perPage);
    },

    previous: function () {
      if ((this.currentPage - 1) < 0) return; // to prevent back if already at the begining of the array
      this.currentPage = this.currentPage - 1; // counter
      this.page = this.users.slice(this.currentPage * this.perPage, (this.currentPage * this.perPage) + this.perPage);
    },

    calcMaxPages: function () { // calculate max pages function
      return Math.ceil(this.users.length / this.perPage);
    },

    fetchData: function () {
      this.fetchAll().then(() => {
        this.currentPage = 0;
        this.page = this.users.slice(this.currentPage, this.perPage)
      });
    },

    onlyGender: function (gender) {
      if ( !this.perma.length ) return;
      this.currentPage = 0;
      this.users = this.perma.filter(user => user.gender === gender);
      this.page = this.users.slice(this.currentPage, this.perPage)
    },
        
    search: function (value) {
      value = value.toLowerCase(); // converting search data to lower case
      this.users = this.perma.filter(user => {
        let first = user.name.first.toLowerCase();
        let last = user.name.last.toLowerCase();
        let fullName = first + ' ' + last;

        return fullName.includes(value)
      });
      this.page = this.users.slice(this.currentPage, this.perPage);
    }
  },
  created: function () {
    // this.fetchData();
  }
});