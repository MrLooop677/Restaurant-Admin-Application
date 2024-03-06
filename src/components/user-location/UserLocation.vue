<template>
  <div>
    <table class="table caption-top" v-if="listOfLocations.length">
      <caption>
        <span> List of Locations ({{ listOfLocations.length }}) </span>
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listOfLocations" :key="index">
          <td>{{ item?.name }}</td>
          <td>{{ item?.phone }}</td>
          <td>{{ item?.address }}</td>
          <td>add/edit/delete</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-warning mt15" role="alert">
      No Locations Added Yet
    </div>
  </div>
</template>

<script>
export default {
  name: "userLocation",
  props: { listOfLocations: [] },
};
</script>

<style></style>
