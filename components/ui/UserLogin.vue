<template>
  <div>
    <v-card rounded class="d-flex flex-column justify-center" style="background-color: rgba(236, 145, 67, 0.5); margin-left: 10%; margin-right: 10%; height: 80vh">
      <v-card-title>
        <v-row class="rowCard fontTitle" justify="start" style="padding-left: 25%;">
          Welcome
        </v-row>
        <v-row class="rowCard fontTitle" justify="end" style="padding-right: 25%">
          Back
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row style="margin-left: 22%; margin-right: 20%;">
          <h2>E-Mail</h2>
        </v-row>
        <v-row class="pa-4 pt-1">
          <v-text-field
            v-model="email"
            style="margin-left: 20%; margin-right: 20%;"
            rounded
            outlined
            dense
            hide-details
          />
        </v-row>
        <v-row style="margin-left: 22%; margin-right: 20%;">
          <h2>Password</h2>
        </v-row>
        <v-row class="pa-4 pt-1">
          <v-text-field
            v-model="password"
            style="margin-left: 20%; margin-right: 20%;"
            rounded
            type="password"
            outlined
            dense
          />
        </v-row>
        <v-alert
          v-if="showAlert"
          type="error"
          outlined
          border="bottom"
          style="margin-left: 25%; width: 50%;"
        >
          Invalid credentials
        </v-alert>
      </v-card-text>
      <v-card-actions class="mb-5">
        <v-col cols="12">
          <v-row class="rowCard" justify="center">
            <v-btn class="pa-2" color="#134700" style="width: 55%;" @click="login">
              <span style="text-transform: none; color: white;">Log-In</span>
            </v-btn>
          </v-row>
          <v-row class="rowCard" justify="center">
            <span>if you didn't have account?</span>
            <a @click="showDialog = true">Sign-Up</a>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="showDialog"
      persistent
      width="auto"
      transition="dialog-bottom-transition"
    >
      <v-card color="#FFC198">
        <v-card-title class="mb-7">
          <h2>Registrar Usuario</h2>
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
              v-model="password"
              class="px-2 mx-2"
              label="Password"
              placeholder="Escribe tu password"
              outlined
              type="password"
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
            <v-btn block color="green" @click="registrarUsuario">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      showDialog: false,
      nombre: null,
      apaterno: null,
      amaterno: null,
      direccion: null,
      telefono: null,
      showAlert: false
    }
  },
  methods: {
    async login () {
      if (this.email === null || this.password === null) {
        return
      }
      const sendData = {
        email: this.email,
        password: this.password
      }
      await this.$auth.loginWith('local', {
        data: sendData
      }).then(async (res) => {
        const result = await res.data
        console.log(res.data)
        if (result.message === 'success') {
          console.log('@@@@@ result => ', result)
          this.$store.commit('setToken', result.token)
          this.$store.commit('setUser', result.user)
          this.$router.push('/dashboard')
        } else {
          this.showAlert = true
          setTimeout(() => {
            this.showAlert = false
          }, 5000)
        }
      }).catch((err) => {
        console.log('@@@ error => ', err)
      })
    },
    registrarUsuario () {
      const url = '/register'
      const data = {
        email: this.email,
        password: this.password,
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono
      }
      this.$axios.post(url, data)
        .then((res) => {
          console.log('@@ res => ', res)
          if (res.data.message === 'User registered successfully') {
            this.showDialog = false
            this.obtenerUsuarios()
            this.email = null
            this.password = null
            this.nombre = null
            this.apaterno = null
            this.amaterno = null
            this.direccion = null
            this.telefono = null
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    }
  }
}
</script>

<style scoped>
.rowCard{
  width: 100%;
  margin: 0!important;
}

.fontTitle{
  /* font-family: Poppins; */
  font-size: 52px!important;
  /* font-weight: 400!important; */
  line-height: 78px!important;;

}
</style>
