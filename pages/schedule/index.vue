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
          <!-- hacer un picker o algo para seleccionar paciente -->
          <!-- tal vez agregar un boton que mande a crear un nuevo paciente -->
          <v-row>
            <v-text-field
              v-model="nombre"
              class=""
              label="Patient"
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
          <!-- hora -->
          <v-row>
            <v-menu
              ref="menu"
              v-model="timeMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-time-picker
                v-if="timeMenu"
                v-model="time"
                full-width
                format="24hr"
                scrollable
                color="#FFC198"
                @click:minute="$refs.menu.save(time)"
              />
            </v-menu>
          </v-row>
          <!-- observaciones -->
          <v-row>
            <v-textarea
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
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      time: null,
      options: [
        ['Yesterday Schedule'],
        ['Today Schedule'],
        ['Tomorrow Schedule']
      ],
      email: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      direccion: null,
      telefono: null,
      edad: null,
      sexo: null
    }
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
          console.log('@@ res => ', res)
          if (res.data.message === 'Patient registered successfully') {
            this.showDialog = false
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
      console.log('@@ appointment => ', typeof (this.date), typeof (this.time))
    }
  }
}
</script>
