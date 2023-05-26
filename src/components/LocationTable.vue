<template>
  <!-- time zone and local time -->
  <div class="row justify-content-center my-3"></div>

  <!-- table -->
  <table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        <th>#</th>
        <th>Location Address</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="locationList.length === 0">
        <td colspan="3" class="text-center">No searched locations</td>
      </tr>
      <tr v-for="(location, index) in pagedLocationList" :key="index">
        <td class="text-center">
          <input class="form-check-input" type="checkbox" />
        </td>
        <td>
          {{ locationList.length - (currentPage - 1) * pageSize - index }}
        </td>
        <td>{{ location.address }}</td>
      </tr>
    </tbody>
  </table>

  <!-- pagination -->
  <div class="row">
    <ul
      class="pagination justify-content-center my-2"
      v-if="locationList.length > 10"
    >
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#result" @click="changePage(currentPage - 1)"
          >Previous</a
        >
      </li>
      <li
        class="page-item"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
      >
        <a class="page-link" href="#result" @click="changePage(pageNumber)">{{
          pageNumber
        }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#result" @click="changePage(currentPage + 1)"
          >Next</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LocationTable",

  props: {
    locationList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      timeZone: "",
      localTime: "",
      currentPage: 1,
      pageSize: 10,
    };
  },

  computed: {
    /* calculate page numbers for pagination */
    totalPages() {
      return Math.ceil(this.locationList.length / this.pageSize);
    },

    /* calculate which row of data to be shown */
    pagedLocationList() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.locationList.slice(start, end);
    },
  },

  methods: {
    /* change page of data */
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
  },
};
</script>

<style>
/* table section */
.table {
  border: 5px solid #efefef;
}

th {
  color: #ffffff;
  background-color: #515555 !important;
}

th,
td {
  padding: 15px !important;
}

tr:nth-child(odd) {
  --bs-table-striped-bg: none;
  background-color: #ffffff !important;
}

tr:nth-child(even) {
  background-color: #f9f9f9 !important;
}

.form-check-input:checked {
  background-color: rgba(0, 160, 175, 1) !important;
  border-color: rgba(0, 160, 175, 1) !important;
}

/* pagination section */
.pagination {
  --bs-pagination-border-radius: 0 !important;
  --bs-pagination-color: rgba(0, 160, 175, 1) !important;
  --bs-pagination-active-bg: rgba(0, 160, 175, 1) !important;
  --bs-pagination-active-border-color: rgba(0, 160, 175, 1) !important;
  --bs-pagination-hover-color: #215158 !important;
  --bs-pagination-focus-color: #215158 !important;
}
</style>
