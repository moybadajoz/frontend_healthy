<template>
  <div>
    <v-row>
      <v-text-field
        outlined
        append-icon="mdi-magnify"
        dense
        hide-details
      />
    </v-row>
    <v-container
      class="mt-5"
      fluid
    >
      <v-row>
        <v-col cols="4">
          <h4>Next appointments</h4>
          <v-card
            v-if="nextAppointment !== null"
            color="#FFDEC8"
            height="35vh"
            style="display: flex; flex-wrap: wrap; align-items: flex-start;"
          >
            <v-card-title>
              <v-avatar
                color="#555"
                class="mr-2"
              >
                <v-icon
                  color="#FFF"
                >
                  mdi-account
                </v-icon>
              </v-avatar>
              <h4>
                {{ nextAppointment.patient.nombre }}
                {{ nextAppointment.patient.apaterno }}
                {{ nextAppointment.patient.amaterno }}
              </h4>
            </v-card-title>
            <v-card-text class="mt-2 ml-2" style="font-size: large;">
              <v-row>
                <span class="mx-1">Date: </span> {{ new Date(nextAppointment.dateTimeStart._seconds*1000).toLocaleDateString() }}
              </v-row>
              <v-row class="mt-5">
                <span class="mx-1">Time: </span> {{ new Date(nextAppointment.dateTimeStart._seconds*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                <span class="mx-2"> to </span> {{ new Date(nextAppointment.dateTimeEnd._seconds*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
              </v-row>
              <v-row class="mt-10">
                <span class="mx-1">Phone number: </span> {{ nextAppointment.patient.telefono }}
              </v-row>
              <v-row v-if="nextAppointment.notes">
                <span class="mx-1">
                  Notes:
                </span>
                {{ nextAppointment.notes }}
              </v-row>
            </v-card-text>
            <v-card-actions style="align-self: end;">
              <v-btn plain>
                <v-icon color="#F00" class="mr-1">
                  mdi-cancel
                </v-icon>
                Cancel Booking
              </v-btn>
              <v-btn plain>
                <v-icon color="#00F" class="mr-1">
                  mdi-calendar-month
                </v-icon>
                Reschedule
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card
            v-else
            color="#FFDEC8"
            height="35vh"
          >
            <v-card-title>
              No appointments
            </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="8">
          <h4>Today's Patients</h4>
          <v-card
            color="#FFDEC8"
            height="35vh"
          >
            <v-card-text>
              <v-row
                v-for="appt in appointments"
                :key="appt.patientId"
              >
                <v-col cols="1">
                  <v-avatar
                    color="#555"
                    class="mr-3"
                  >
                    <v-icon
                      color="#FFF"
                    >
                      mdi-account
                    </v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="5">
                  <v-row class="px-3 pt-1">
                    <h3>
                      {{ appt.patient.nombre }}
                      {{ appt.patient.apaterno }}
                      {{ appt.patient.amaterno }}
                    </h3>
                  </v-row>
                  <v-row class="px-3">
                    Email: {{ appt.patient.email }}
                  </v-row>
                  <v-row class="px-3">
                    Phone number: {{ appt.patient.telefono }}
                  </v-row>
                </v-col>
                <v-col cols="auto">
                  <v-row class="px-3 pt-1">
                    Direccion: {{ appt.patient.direccion }}
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="3">
          <h4>???</h4>
          <v-card
            color="#FFDEC8"
            height="35vh"
          >
            daw
          </v-card>
        </v-col>
        <v-col cols="5">
          <h4>Next appointments</h4>
          <v-card
            color="#FFDEC8"
            height="35vh"
          >
            daw
          </v-card>
        </v-col>
        <v-col cols="4">
          <h4>Next appointments</h4>
          <v-card
            color="#FFDEC8"
            height="35vh"
          >
            daw
          </v-card>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      nextAppointment: null,
      appointments: null
    }
  },
  mounted () {
    this.getNextAppointment()
    this.getAppointments()
  },
  methods: {
    getNextAppointment () {
      const now = new Date()
      // now.setMonth(12)
      const url = `/next-appointment/${now.toISOString()}`
      this.$axios.get(url)
        .then((res) => {
          if (res.data.appointment.err === undefined) {
            this.nextAppointment = res.data.appointment
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    },
    getAppointments () {
      const startOfDay = new Date()
      const endOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      endOfDay.setHours(23, 59, 59, 999)
      // console.log(`/getAppointments/${startOfDay.toISOString()}/${endOfDay}`)
      const url = `/getAppointments/${startOfDay.toISOString()}/${endOfDay.toISOString()}`
      this.$axios.get(url)
        .then((res) => {
          this.appointments = res.data.appointments
          console.log(this.appointments)
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    }
  }
}
</script>
