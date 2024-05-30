<template>
  <div>id: {{ id }}</div>
</template>

<script>
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  }
}
</script>
