<template>
  <div>
    <v-card rounded color="#EC9143">
      <v-card-title>
        <v-row class="rowCard fontTitle" justify="center">
          Welcome
        </v-row>
        <v-row class="rowCard fontTitle" justify="center">
          Back
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-row class="pa-4">
          <v-text-field v-model="email" rounded label="E-Mail" outlined />
        </v-row>
        <v-row class="pa-4">
          <v-text-field v-model="password" rounded label="Password" outlined />
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12">
          <v-row class="rowCard">
            <v-btn block class="pa-2" color="#134700" @click="login">
              <span style="text-transform: none; color: white;">Log-In</span>
            </v-btn>
          </v-row>
          <v-row class="rowCard">
            <span>if you didn't have account?</span>
            <a @click="showDialog = true">Sign-Up</a>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-dialog
      v-model="showDialog"
      persistent
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          Agregar Usuario
        </v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="email"
              class="px-2 mx-2 pt-2"
              label="Correo"
              placeholder="Escribe tu Correo"
              outlined
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
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="nombre"
              class="px-2 mx-2"
              label="Nombre"
              placeholder="Escribe tu nombre"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="apaterno"
              class="px-2 mx-2"
              label="Apellido Paterno"
              placeholder="Escribe tu apellido paterno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="amaterno"
              class="px-2 mx-2"
              label="Apellido Materno"
              placeholder="Escribe tu apellido materno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="direccion"
              class="px-2 mx-2"
              label="Direccion"
              placeholder="Escribe tu direccion"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="telefono"
              class="px-2 mx-2"
              label="Telefono"
              placeholder="Escribe tu telefono"
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
      telefono: null
    }
  },
  methods: {
    async login () {
      await console.log('@@@ datos => ', this.email, this.password)
      const sendData = {
        email: this.email,
        password: this.password
      }
      await this.$auth.loginWith('local', {
        data: sendData
      }).then(async (res) => {
        const result = await res.data
        if (result.message === 'success') {
          this.$store.commit('setToken', result.token)
          this.$router.push('/dashboard')
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
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
      this.email = null
      this.password = null
      this.nombre = null
      this.apaterno = null
      this.amaterno = null
      this.direccion = null
      this.telefono = null
    }
  }
}
</script>

<style scoped>
.rowCard{
  width:100%;
  display: flex;
  justify-content: center;
}

.fontTitle{
  /* font-family: Poppins; */
  font-size: 52px!important;
  /* font-weight: 400!important; */
  line-height: 78px!important;;

}
</style>
