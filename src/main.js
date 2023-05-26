import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Import FontAwesome Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSearch,
  faLocationCrosshairs,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faLocationCrosshairs, faTrashCan);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
