<template>
  <NavBar />
  <div class="container justify-content-center p-5">
    <!-- search bar -->
    <section id="searchbar" class="container my-5">
      <div class="row">
        <div class="col">
          <div class="alert alert-danger" v-show="error">
            {{ error }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-8 my-1">
          <input
            type="text"
            class="form-control"
            placeholder="Enter a location"
            v-model="locationInput"
            id="autocomplete"
            @keydown.enter="searchLocation"
          />
        </div>
        <div class="col-md-3 col-lg-2 my-1">
          <button
            class="btn text-white"
            @click="getCurrentLocation"
            @keydown.enter="searchLocation"
          >
            <font-awesome-icon icon="location-crosshairs" /> Current
          </button>
        </div>
        <div class="col-md-3 col-lg-2 my-1">
          <button class="btn text-white" @click="searchLocation">
            <font-awesome-icon icon="search" /> Search
          </button>
        </div>
      </div>
    </section>

    <!-- google map -->
    <section id="map" class="container my-5">
      <LocationMap :locationList="searchedLocation" />
    </section>

    <!-- searched location table -->
    <section id="table" class="container result my-5">
      <h3>Searched Locations</h3>
      <div
        class="row justify-content-center my-3"
        v-if="searchedLocation.length > 0"
      >
        <div class="col-lg-4">
          <h5>Time Zone of # {{ searchedLocation.length }}</h5>
          <p>{{ timeZone }}</p>
        </div>
        <div class="col-lg-8">
          <h5>Local Time of # {{ searchedLocation.length }}</h5>
          <p>{{ localTime }}</p>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-md-3 col-lg-2">
          <button class="btn text-white" @click="deleteLocation">
            <font-awesome-icon icon="trash-can" /> Delete
          </button>
        </div>
      </div>
      <LocationTable
        :locationList="searchedLocation"
        :deleteLocation="deleteLocation"
      />
    </section>
  </div>
  <FooterArea />
</template>

<script>
/* import page components */
import NavBar from "../components/NavBar.vue";
import LocationMap from "../components/LocationMap.vue";
import LocationTable from "../components/LocationTable.vue";
import FooterArea from "../components/FooterArea.vue";

import axios from "axios";

export default {
  name: "LocationSearch",

  components: {
    NavBar,
    LocationMap,
    LocationTable,
    FooterArea,
  },

  data() {
    return {
      key: "API-Key",
      locationInput: "",
      locationInformation: {},
      searchedLocation: [],
      timeZone: "",
      localTime: "",
      error: "",
    };
  },

  mounted() {
    /* autocomplete location search */
    var autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("autocomplete")
    );

    autocomplete.addListener("place_changed", () => {
      this.error = "";
      var place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        this.error = "Please select a valid location."; // handle invalid input
      } else {
        // capture current input
        const address = place.formatted_address;
        const location = place.geometry.location;

        this.locationInput = address;

        this.locationInformation = {
          address: address,
          location: { lat: location.lat(), lng: location.lng() },
        };
      }
    });
  },

  methods: {
    /* get current location for Current button */
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            const geocoder = new window.google.maps.Geocoder();

            // show formatted address of current location on search bar
            geocoder.geocode({ location }, (results, status) => {
              if (status == "OK") {
                this.locationInput = results[0].formatted_address;
                this.locationInformation = {
                  address: results[0].formatted_address,
                  location: location,
                };
                this.error = "";
              } else {
                this.error =
                  "Geocode was not successful for the following reason: " +
                  status;
              }
            });
          },
          (error) => {
            this.error =
              "Please allow the location access or enter location manually.";
            console.log(error.message);
          }
        );
      } else {
        this.error = "This browser does not support geolocation API.";
      }
    },

    /* search location for Search button to show on map and table */
    searchLocation() {
      if (this.locationInput) {
        if (this.locationInput === this.locationInformation.address) {
          this.error = "";
          this.searchedLocation.unshift(this.locationInformation); // insert to first row
          this.getTimeZoneAndLocalTime(this.searchedLocation[0].location);
        }
      } else {
        this.error = "Please enter a location.";
      }
    },

    /* get time zone and local time to show */
    getTimeZoneAndLocalTime(location) {
      const timestamp = Math.floor(Date.now() / 1000);
      const apiUrl =
        "https://maps.googleapis.com/maps/api/timezone/json?location=" +
        location.lat +
        "," +
        location.lng +
        "&timestamp=" +
        timestamp +
        "&key=" +
        this.key;
      const currentTime = new Date();

      axios
        .get(apiUrl)
        .then((response) => {
          const timeZone = response.data;
          const timeZoneOffset = timeZone.rawOffset + timeZone.dstOffset;
          const localTime = currentTime.getTime() + timeZoneOffset * 1000;

          this.timeZone = timeZone.timeZoneId;
          this.localTime = new Date(localTime);
        })
        .catch((error) => {
          this.error = error;
        });
    },

    /* delete selected locations for Delete button */
    deleteLocation() {
      const checkboxes = document.querySelectorAll(".form-check-input");

      for (let index = checkboxes.length - 1; index >= 0; index--) {
        const checkbox = checkboxes[index];
        if (checkbox.checked) {
          checkbox.checked = false;
          this.searchedLocation.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style>
/* search bar section */
#searchbar input {
  background-color: #f5f8fa;
  border: 1px solid #cbd6e2;
  font-size: 16px;
  font-weight: 400;
}

#searchbar input:focus {
  box-shadow: none;
  outline: 0;
  border-color: rgba(82, 168, 236, 0.8);
}

/* table section */
#table button {
  background: #f68c34;
}

#table button:hover {
  background: rgba(219, 127, 15, 1);
}
</style>
