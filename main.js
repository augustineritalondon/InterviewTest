new Vue({
  el: "#app",
  data: {
    users: [],
    page: [],
    perPage: 4,
    currentPage: 0,
    maxPages: 0
  },
  methods: {
    fetchData: function () {
      fetch('https://randomuser.me/api/?results=20')
        .then((response) => response.json())
        .then((data) => {
          this.users = data.results; // all user data
          this.page = this.users.slice(this.currentPage, this.perPage) // page user data
          this.maxPages = Math.ceil(data.results.length / 4); // maximum pages
        });
    },
    next: function () {
      if ((this.currentPage + 1) >= this.maxPages) return; // to prevent forward if at the end of the array
      this.currentPage = this.currentPage + 1; // counter
      this.page = this.users.slice(this.currentPage * 4, (this.currentPage * 4) + this.perPage);
    },

    previous: function () {
      if ((this.currentPage - 1) < 0) return; // to prevent back if already at the begining of the array
      this.currentPage = this.currentPage - 1; // counter
      this.page = this.users.slice(this.currentPage * 4, (this.currentPage * 4) + this.perPage);
    }
  },
  created: function () {
    this.fetchData();
  }
});