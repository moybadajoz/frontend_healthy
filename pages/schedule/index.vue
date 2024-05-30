<template>
  <div>
    <v-row>
      <v-text-field
        outlined
        append-icon="mdi-magnify"
        dense
        hide-details
        rounded
      />
      <v-btn
        class="ml-3"
        color="green darken-2"
        rounded
        @click="showDialog=true"
      >
        New patient
      </v-btn>
      <v-btn
        class="ml-3"
        color="primary"
        rounded
        @click="showAppointmentDialog=true"
      >
        New appointment
      </v-btn>
    </v-row>
    <v-row>
      <v-slide-group
        v-model="selectedOption"
        class="pa-4"
        mandatory
        @change="getAppointments(selectedOption)"
      >
        <v-slide-item
          v-for="[text] in options"
          :key="text"
          v-slot="{ active, toggle}"
        >
          <v-btn
            class="mx-3 mb-1"
            :input-value="active"
            active-class="warning"
            rounded
            elevation="0"
            outlined
            @click="toggle"
          >
            {{ text }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-row>
    <v-col>
      <appointment-card
        v-for="item in appointments"
        :key="item"
        :appointment="item"
        @reload-appts="getAppointments(selectedOption)"
      />
    </v-col>
    <v-dialog
      v-model="showDialog"
      persistent
      width="auto"
      transition="dialog-bottom-transition"
    >
      <v-card color="#FFDEC8">
        <v-card-title class="mb-7">
          <h2>Registrar Paciente</h2>
        </v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="nombre"
              class="px-2 mx-2"
              label="Nombre"
              placeholder="Escribe tu nombre"
              dense
              outlined
              rounded
            />
            <v-text-field
              v-model="apaterno"
              class="px-2 mx-2"
              label="Apellido Paterno"
              placeholder="Escribe tu apellido paterno"
              dense
              rounded
              outlined
            />
            <v-text-field
              v-model="amaterno"
              class="px-2 mx-2"
              label="Apellido Materno"
              placeholder="Escribe tu apellido materno"
              dense
              rounded
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="sexo"
              label="Sexo"
              placeholder="Escribe tu sexo"
              class="px-2 mx-2"
              dense
              rounded
              outlined
            />
            <v-text-field
              v-model="edad"
              label="Edad"
              placeholder="Escribe tu edad"
              class="px-2 mx-2"
              dense
              rounded
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="email"
              class="px-2 mx-2"
              label="Correo"
              placeholder="Escribe tu Correo"
              outlined
              rounded
              dense
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="direccion"
              class="px-2 mx-2"
              label="Direccion"
              placeholder="Escribe tu direccion"
              dense
              rounded
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="telefono"
              class="px-2 mx-2"
              label="Telefono"
              placeholder="Escribe tu telefono"
              dense
              rounded
              outlined
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="registerPatient">
              <span style="text-transform: none; color: white;">
                Registrar
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDialog=false">
              <span style="text-transform: none; color: white;">
                Cancelar
              </span>
            </v-btn>
          </v-col>
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
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      selectedOption: 1,
      showDialog: false,
      showAppointmentDialog: false,
      dateMenu: false,
      timeMenu: false,
      timeMenuEnd: false,
      // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      date: null,
      timeStart: null,
      timeEnd: null,
      notes: '',
      options: [
        ['Yesterday Schedule'],
        ['Today Schedule'],
        ['Tomorrow Schedule'],
        ['Month Schedule']
      ],
      email: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      direccion: null,
      telefono: null,
      edad: null,
      sexo: null,
      selectPatient: { name: null, email: '', id: null },
      selectItems: [],
      appointments: []
    }
  },
  mounted () {
    this.getPatients()
    this.getAppointments(this.selectedOption)
  },
  methods: {
    registerPatient () {
      const url = '/register_patient'
      const data = {
        email: this.email,
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono,
        edad: this.edad,
        sexo: this.sexo
      }
      this.$axios.post(url, data)
        .then((res) => {
          // console.log('@@ res => ', res)
          if (res.data.message === 'Patient registered successfully') {
            this.showDialog = false
            this.getPatients()
            this.email = null
            this.nombre = null
            this.apaterno = null
            this.amaterno = null
            this.direccion = null
            this.telefono = null
            this.edad = null
            this.sexo = null
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    },
    bookingAppointment () {
      // console.log('@@ appointment => ', this.selectPatient, this.date, this.time, this.notes)
      const url = '/bookingAppointment'

      const sendData = {
        dateTimeStart: new Date(`${this.date}T${this.timeStart}`),
        dateTimeEnd: new Date(`${this.date}T${this.timeEnd}`),
        notes: this.notes,
        patientId: this.selectPatient.id
      }
      // console.log('@@ sendData => ', sendData)

      this.$axios.post(url, sendData)
        .then((res) => {
          console.log('@@ res => ', res)
          if (res.data.message === 'Successful') {
            this.showAppointmentDialog = false
            this.getAppointments(this.selectedOption)
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    },
    getPatients () {
      const url = '/get-all-patients'

      this.$axios.get(url)
        .then((res) => {
          if (res.data.message === 'success') {
            // console.log(res.data.patients)
            res.data.patients.forEach((patient) => {
              this.selectItems.push({
                name: `${patient.nombre} ${patient.apaterno} ${patient.amaterno}`,
                email: patient.email,
                id: patient.patientId
              })
            })
            // console.log(this.selectItems)
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    },
    getAppointments (selectedDay) {
      const startOfDay = new Date()
      const endOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      endOfDay.setHours(23, 59, 59, 999)
      switch (selectedDay) {
        case 0:
          startOfDay.setDate(startOfDay.getDate() - 1)
          endOfDay.setDate(endOfDay.getDate() - 1)
          break
        case 1:
          break
        case 2:
          startOfDay.setDate(startOfDay.getDate() + 1)
          endOfDay.setDate(endOfDay.getDate() + 1)
          break
        case 3:
          endOfDay.setMonth(endOfDay.getMonth() + 1)
          break
        default:
          break
      }
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
