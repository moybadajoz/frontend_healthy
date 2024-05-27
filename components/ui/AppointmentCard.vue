<template>
  <v-row>
    <v-row class="mt-2 mb-4">
      <!-- avatar -->
      <v-col cols="2" align-self="center">
        <v-row justify="center">
          <v-avatar
            color="#555"
            width="11vh"
            height="11vh"
          >
            <v-icon
              color="#FFF"
              x-large
            >
              mdi-account
            </v-icon>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row>
          <h2>
            {{ appointment.patient.nombre }}
            {{ appointment.patient.apaterno }}
            {{ appointment.patient.amaterno }}
          </h2>
        </v-row>
        <v-row>
          <h3>
            <span>
              Edad: {{ appointment.patient.edad }}
            </span>
            <span class="ml-3">
              Sexo: {{ appointment.patient.sexo }}
            </span>
          </h3>
        </v-row>
        <v-row>
          Phone Number: {{ appointment.patient.telefono }}
        </v-row>
        <v-row>
          E-mail: {{ appointment.patient.email }}
        </v-row>
        <v-row>
          Adress: {{ appointment.patient.direccion }}
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row class="mt-7">
          Date: {{ new Date(appointment.dateTimeStart._seconds*1000).toLocaleDateString() }}
        </v-row>
        <v-row>
          Time: {{ new Date(appointment.dateTimeStart._seconds*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
          to {{ new Date(appointment.dateTimeEnd._seconds*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
        </v-row>
        <v-row v-if="appointment.notes">
          Notes: {{ appointment.notes }}
        </v-row>
      </v-col>
    </v-row>
  </v-row>
</template>

<script>
export default {
  props: {
    appointment: {
      type: JSON,
      default: {
        patient: {
          nombre: '',
          edad: '',
          sexo: '',
          telefono: '',
          email: '',
          direccion: ''
        },
        date: '',
        time: ''
      }
    }
  }
}
</script>
