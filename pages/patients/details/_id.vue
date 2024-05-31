<template>
  <div>
    <v-row>
      <v-col cols="2" />
      <v-col cols="8">
        <v-text-field
          outlined
          dense
          rounded
          hide-details
        />
      </v-col>
      <v-col cols="2">
        <v-icon
          x-large
        >
          mdi-clock
        </v-icon>
      </v-col>
    </v-row>
    <v-row
      class="mx-15 mt-15"
    >
      <v-col cols="auto">
        <v-img
          :src="require('@/assets/p-img.svg')"
          max-width="260"
        />
      </v-col>
      <v-col
        cols="auto"
        class="ml-2"
      >
        <v-row
          class="mt-1"
        >
          <h3>
            {{ patient.nombre }}
            {{ patient.apaterno }}
            {{ patient.amaterno }}
          </h3>
        </v-row>
        <v-row class="mt-5">
          <h4>
            <span>Age: {{ patient.edad }}</span>
            <span class="ml-10">Sex: {{ patient.sexo }}</span>
          </h4>
        </v-row>
        <v-row class="mt-5">
          <h5>
            Phone number: {{ patient.telefono }}
          </h5>
        </v-row>
        <v-row class="mt-5">
          <h5>
            Email: {{ patient.email }}
          </h5>
        </v-row>
        <v-row class="mt-5">
          <h5>
            Address: {{ patient.direccion }}
          </h5>
        </v-row>
      </v-col>
      <v-col cols="6" style="display: flex; justify-content: space-evenly;">
        <v-col cols="3" style="display: flex; justify-content: center;">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="88"
            color="#2CAA00"
          >
            <span style="color: black; font-size: large;">{{ 88 }}%</span>
          </v-progress-circular>
          <v-row class="mt-1" style="justify-content: center;">
            <span style="font-size: xx-small;">81/72</span>
          </v-row>
          <v-row style="">
            <h6>Sugar</h6>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="66"
            color="#2CAA00"
          >
            <span style="color: black; font-size: large;">{{ 66 }}%</span>
          </v-progress-circular>
          <v-row class="mt-1" style="justify-content: center;">
            <span style="font-size: xx-small;">118/120</span>
          </v-row>
          <v-row style="justify-content: center;">
            <h6>Sugar</h6>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="50"
            color="#2CAA00"
          >
            <span style="color: black; font-size: large;">{{ 50 }}%</span>
          </v-progress-circular>
          <v-row class="mt-1" style="justify-content: center;">
            <span style="font-size: xx-small;">118/90</span>
          </v-row>
          <v-row style="justify-content: center;">
            <h6>Blood Pressire</h6>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      patient: {
        amaterno: null,
        apaterno: null,
        direccion: null,
        edad: null,
        email: null,
        nombre: null,
        sexo: null,
        telefono: null,
        userId: null
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getPatient()
  },
  methods: {
    getPatient () {
      const url = `/get-patient/${this.id}`
      this.$axios.get(url)
        .then((res) => {
          if (res.data.message === 'success') {
            console.log(res.data)
            this.patient = res.data.patient
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>

</style>
