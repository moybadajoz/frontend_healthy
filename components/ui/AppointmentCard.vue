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
      <v-col cols="1" align-self="center">
        <v-row style="justify-content: center;">
          State
        </v-row>
        <v-row style="justify-content: center;">
          <!-- booking -->
          <v-avatar
            v-if="appointment.state === 'Booking'"
            class="mr-2"
          >
            <v-icon
              color="#0000AF"
            >
              mdi-book-clock
            </v-icon>
          </v-avatar>
          <!-- canceled -->
          <v-avatar
            v-else-if="appointment.state === 'Canceled'"
            class="mr-2"
          >
            <v-icon
              color="#FF0000"
            >
              mdi-book-cancel
            </v-icon>
          </v-avatar>
          <!-- completed -->
          <v-avatar
            v-else
            class="mr-2"
          >
            <v-icon
              color="#00AF00"
            >
              mdi-book-check
            </v-icon>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col cols="auto" align-self="center">
        <v-row>
          <v-btn plain>
            <v-icon color="#00F" class="mr-1">
              mdi-calendar-month
            </v-icon>
            Reschedule
          </v-btn>
        </v-row>
        <v-row>
          <v-btn
            plain
            @click="cancelConfirm=true"
          >
            <v-icon color="#F00" class="mr-1">
              mdi-cancel
            </v-icon>
            Cancel Booking
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
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
            @click="cancelAppt(appointment.apptId)"
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
          <h2>New appointment</h2>
        </v-card-title>
        <v-card-text>
          <!-- paciente -->
          <!-- hacer un picker o algo para seleccionar paciente -->
          <!-- tal vez agregar un boton que mande a crear un nuevo paciente -->
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
            <v-btn block color="green" @click="bookingAppointment">
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
  },
  data () {
    return {
      cancelConfirm: false
    }
  },
  methods: {
    cancelAppt (id) {
      const url = `/cancelAppointment/${id}`
      this.$axios.put(url)
        .then((res) => {
          if (res.data.message === 'Success') {
            this.cancelConfirm = false
            this.$emit('reload-appts')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
