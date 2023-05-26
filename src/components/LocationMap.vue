<template>
  <GoogleMap
    style="width: 100%; height: 500px"
    :center="locationList.length == 0 ? center : locationList[0].location"
    :zoom="10"
  >
    <Marker
      v-for="(location, index) in locationList"
      :key="index"
      :options="{
        position: location.location,
        label: {
          text: (locationList.length - index).toString(),
          color: 'white',
        },
      }"
    />
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  name: "LocationMap",

  components: {
    GoogleMap,
    Marker,
  },

  props: {
    locationList: {
      type: Array,
      required: true,
    },
  },

  setup() {
    /* set default map location to Toronto */
    const center = { lat: 43.653908, lng: -79.384293 };
    return { center };
  },
};
</script>

<style></style>
