<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="patients"
      item-key="patientId"
      :search="search"
    >
      <template #top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
      <template #[`item.acciones`]="{item}">
        <v-btn
          icon
          @click="patientDetails(item.patientId)"
        >
          <v-icon>
            mdi-account-details
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      patients: [],
      search: ''
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Nombre',
          value: 'nombre',
          sorteable: false
        },
        {
          text: 'A. paterno',
          value: 'apaterno',
          sorteable: false
        },
        {
          text: 'A. materno',
          value: 'amaterno',
          sorteable: false
        },
        {
          text: 'Email',
          value: 'email',
          sorteable: false
        },
        {
          text: 'Telefono',
          value: 'telefono',
          sorteable: false
        },
        {
          text: 'Edad',
          value: 'edad',
          sorteable: false
        },
        {
          text: 'Sexo',
          value: 'sexo',
          sorteable: false
        },
        {
          text: 'Acciones',
          value: 'acciones',
          sorteable: false
        }
      ]
    }
  },
  mounted () {
    this.getAllPatients()
  },
  methods: {
    getAllPatients () {
      const url = '/get-all-patients'

      this.$axios.get(url)
        .then((res) => {
          if (res.data.message === 'success') {
            this.patients = res.data.patients
          }
        })
        .catch((error) => {
          this.emitAlert('something went wrong')
          console.log('@@ error => ', error)
        })
    },
    patientDetails (id) {
      this.$router.push({ name: 'patients-details-id', params: { id } })
    },
    emitAlert (text) {
      this.$nuxt.$emit('show-alert', {
        color: 'red darken-4',
        type: 'error',
        text,
        border: 'bottom',
        width: 600,
        time: 5000
      })
    }
  }
}
</script>
