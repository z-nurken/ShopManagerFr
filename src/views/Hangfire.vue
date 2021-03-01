<template>
  <iframe
    frameborder="0"
    style="overflow: hidden; height: 500px; width: 100%"
    :src="`${baseURL}/hangfire?access_token=${accToken}`"
    fram
  ></iframe>
</template>

<script>

import { BASE_API_URL } from '../config';

export default {
  inject: ['theme'],
  data: () => ({
    baseURL: BASE_API_URL,
    accToken: localStorage.getItem('token'),
  }),
  mounted() {},
  methods: {},
  created() {},
};
</script>
<style scoped></style>
