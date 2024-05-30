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
            v-if="nxtAppt !== null"
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
                {{ nxtAppt.patient.nombre }}
                {{ nxtAppt.patient.apaterno }}
                {{ nxtAppt.patient.amaterno }}
              </h4>
            </v-card-title>
            <v-card-text class="mt-2 ml-2" style="font-size: large;">
              <v-row>
                <span class="mx-1">Date: </span> {{ new Date(nxtAppt.dateTimeStart._seconds*1000).toLocaleDateString() }}
              </v-row>
              <v-row class="mt-5">
                <span class="mx-1">Time: </span> {{ new Date(nxtAppt.dateTimeStart._seconds*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
                <span class="mx-2"> to </span> {{ new Date(nxtAppt.dateTimeEnd._seconds*1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
              </v-row>
              <v-row class="mt-10">
                <span class="mx-1">Phone number: </span> {{ nxtAppt.patient.telefono }}
              </v-row>
              <v-row v-if="nxtAppt.notes">
                <span class="mx-1">
                  Notes:
                </span>
                {{ nxtAppt.notes }}
              </v-row>
            </v-card-text>
            <v-card-actions style="align-self: end;">
              <v-btn
                plain
                @click="cancelConfirm=true"
              >
                <v-icon color="#F00" class="mr-1">
                  mdi-cancel
                </v-icon>
                Cancel Booking
              </v-btn>
              <v-btn
                plain
                @click="showAppointmentDialog=true"
              >
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
    <v-dialog
      v-model="cancelConfirm"
      persistent
      width="20%"
    >
      <v-card
        color="#FFDEC8"
      >
        <v-card-title>
          Are you sure?
        </v-card-title>
        <v-divider />
        <v-card-text>
          This action will cancel the appointment
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="mb-2"
            color="warning"
            @click="cancelAppt(nxtAppt.apptId)"
          >
            Confirm
          </v-btn>
          <v-btn
            class="mb-2"
            color="red"
            @click="cancelConfirm=false"
          >
            Return
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showAppointmentDialog"
      persistent
      width="auto"
      transition="dialog-bottom-transition"
    >
      <v-card color="#FFDEC8">
        <v-card-title class="mb-7">
          <h2>Reschedule appointment</h2>
        </v-card-title>
        <v-card-text>
          <!-- paciente -->
          <v-row>
            <v-select
              v-model="selectPatient"
              label="Patient"
              :hint="`${selectPatient.email}`"
              :items="selectItems"
              item-text="name"
              item-value="id"
              persistent-hint
              return-object
              single-line
              dense
              disabled
            />
          </v-row>
          <!-- fecha -->
          <v-row>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-inner-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date"
                color="#FFC198"
                @input="dateMenu = false"
              />
            </v-menu>
          </v-row>
          <!-- hora inicio -->
          <v-row>
            <v-menu
              ref="menu"
              v-model="timeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeStart"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="timeStart"
                  label="Time start"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-if="timeMenu"
                v-model="timeStart"
                full-width
                format="24hr"
                scrollable
                color="#FFC198"
                @click:minute="$refs.menu.save(timeStart)"
              />
            </v-menu>
          </v-row>
          <!-- hora fin -->
          <v-row>
            <v-menu
              ref="menu2"
              v-model="timeMenuEnd"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="timeEnd"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="timeEnd"
                  label="Time end"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-if="timeMenuEnd"
                v-model="timeEnd"
                full-width
                format="24hr"
                scrollable
                color="#FFC198"
                @click:minute="$refs.menu2.save(timeEnd)"
              />
            </v-menu>
          </v-row>
          <!-- observaciones -->
          <v-row>
            <v-textarea
              v-model="notes"
              auto-grow
              row-height="30"
              rows="2"
              label="Notes"
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="rescheduleAppointment">
              <span style="text-transform: none; color: white;">
                Booking
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showAppointmentDialog=false">
              <span style="text-transform: none; color: white;">
                Cancel
              </span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      nxtAppt: null,
      appointments: null,
      cancelConfirm: false,
      showAppointmentDialog: false,
      selectPatient: { name: null, email: '', id: null },
      selectItems: [],
      dateMenu: false,
      timeMenu: false,
      timeMenuEnd: false,
      date: null,
      timeStart: null,
      timeEnd: null,
      notes: null
    }
  },
  mounted () {
    this.getnxtAppt()
    this.getAppointments()
  },
  methods: {
    getnxtAppt () {
      const now = new Date()
      // now.setMonth(12)
      const url = `/next-appointment/${now.toISOString()}`
      this.$axios.get(url)
        .then((res) => {
          console.log(res)
          if (res.data.appointment.err === undefined) {
            this.nxtAppt = res.data.appointment
            this.selectPatient = {
              name: `${this.nxtAppt.patient.nombre} ${this.nxtAppt.patient.apaterno} ${this.nxtAppt.patient.amaterno}`,
              email: this.nxtAppt.patient.email,
              id: this.nxtAppt.patientId
            }
            this.selectItems = [this.selectPatient]
            this.date = (new Date(this.nxtAppt.dateTimeStart._seconds * 1000)).toLocaleDateString('en-CA')
            this.timeStart = (new Date(this.nxtAppt.dateTimeStart._seconds * 1000)).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
            this.timeEnd = (new Date(this.nxtAppt.dateTimeEnd._seconds * 1000)).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })
            this.notes = this.nxtAppt.notes
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
          // console.log(this.appointments)
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    },
    cancelAppt (id) {
      const url = `/cancelAppointment/${id}`
      this.$axios.put(url)
        .then((res) => {
          if (res.data.message === 'Success') {
            this.cancelConfirm = false
            this.getnxtAppt()
            this.getAppointments()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    rescheduleAppointment () {
      const url = `/reschedule-appointment/${this.nxtAppt.apptId}`

      const sendData = {
        dateTimeStart: new Date(`${this.date}T${this.timeStart}`),
        dateTimeEnd: new Date(`${this.date}T${this.timeEnd}`),
        notes: this.notes,
        patientId: this.selectPatient.id
      }
      // console.log('@@ sendData => ', sendData)

      this.$axios.put(url, sendData)
        .then((res) => {
          console.log('@@ res => ', res)
          if (res.data.message === 'Successful') {
            this.showAppointmentDialog = false
            this.getnxtAppt()
            this.getAppointments()
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    }
  }
}
</script>
