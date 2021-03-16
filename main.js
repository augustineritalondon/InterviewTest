new Vue({
    el: "#app",
    data: {
      fullName: "",
      email: "",
      location: "",
      phone: "",
      image: ""
    },
    methods: {
      fetchData: function () {
        fetch('https://randomuser.me/api/?results=1000')
          .then((response) => response.json())
          .then((data) => {
            let info = data.results[0];
            this.fullName = `${(info.name.first)} ${(
              info.name.last
            )}`;
            this.email = info.email;
            this.location = `${(info.location.street.number)} ${(info.location.street.name)} ${(
              info.location.city)} ${(info.location.state)}`;
            this.phone = info.phone;
            this.image = info.picture.medium;
            console.log(info);
          });
      }
    },
    created: function () {
      this.fetchData();
    } 
  });