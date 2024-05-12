<template>
  <v-col cols="12">
    <v-row>
      <v-btn block color="#2190ab" @click="showDialog = true">
        <span style="text-transform: none;">
          Usuario Nuevo
        </span>
      </v-btn>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="usuarios"
      >
        <template #[`item.email`]="{item}">
          <span style="font-weight: 800;">
            {{ item.email }}
          </span>
        </template>
        <template #[`item.acciones`]="{item}">
          <v-row>
            <v-col cols="6">
              <v-btn icon color="red" @click="deleteUser(item)">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn icon color="warning" @click="updateUser(item)">
                <v-icon>mdi-file-edit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>
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
    <v-dialog
      v-model="showDelete"
      width="300"
      persistent
    >
      <v-card>
        <v-card-title>
          Delete User
        </v-card-title>
        <v-card-text>
          Are your sure?
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="borrarUsuario">
              <span style="text-transform: none; color: white;">
                Borrar
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showDelete=false">
              <span style="text-transform: none; color: white;">
                Cancelar
              </span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showEdit"
      persistent
      width="500"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          Editar Usuario {{ upEmail }}
        </v-card-title>
        <v-card-text>
          <v-row width="100%">
            <v-text-field
              v-model="upPassword"
              class="px-2 mx-2"
              label="Password"
              placeholder="Escribe tu password"
              outlined
              type="password"
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="upNombre"
              class="px-2 mx-2"
              label="Nombre"
              placeholder="Escribe tu nombre"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="upApaterno"
              class="px-2 mx-2"
              label="Apellido Paterno"
              placeholder="Escribe tu apellido paterno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="upAmaterno"
              class="px-2 mx-2"
              label="Apellido Materno"
              placeholder="Escribe tu apellido materno"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="upDireccion"
              class="px-2 mx-2"
              label="Direccion"
              placeholder="Escribe tu direccion"
              outlined
            />
          </v-row>
          <v-row width="100%">
            <v-text-field
              v-model="upTelefono"
              class="px-2 mx-2"
              label="Telefono"
              placeholder="Escribe tu telefono"
              outlined
            />
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col cols="6">
            <v-btn block color="green" @click="saveUpdateUser">
              <span style="text-transform: none; color: white;">
                Guardar
              </span>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn block color="red" @click="showEdit=false">
              <span style="text-transform: none; color: white;">
                Cancelar
              </span>
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      usuarios: [],
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'center',
          sortable: true
        },
        {
          text: 'Nombre',
          value: 'nombre',
          align: 'center',
          sortable: true
        },
        {
          text: 'Ap. Paterno',
          value: 'apaterno',
          align: 'center',
          sortable: true
        },
        {
          text: 'Ap. Materno',
          value: 'amaterno',
          align: 'center',
          sortable: true
        },
        {
          text: 'Direccion',
          value: 'direccion',
          align: 'center',
          sortable: true
        },
        {
          text: 'Telefono',
          value: 'telefono',
          align: 'center',
          sortable: true
        },
        {
          text: 'Acciones',
          value: 'acciones',
          align: 'center'
        }
      ],
      showDialog: false,
      email: null,
      password: null,
      nombre: null,
      apaterno: null,
      amaterno: null,
      direccion: null,
      telefono: null,
      userToDelete: null,
      showDelete: false,
      showEdit: false,
      upEmail: null,
      upPassword: null,
      upNombre: null,
      upApaterno: null,
      upAmaterno: null,
      upDireccion: null,
      upTelefono: null
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.obtenerUsuarios()
  },
  methods: {
    obtenerUsuarios () {
      const url = '/get-all-users'

      this.$axios.get(url)
        .then((res) => {
          // console.log('@@ response => ', res)
          if (res.data.message === 'success') {
            this.usuarios = res.data.users
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
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
    },
    deleteUser (user) {
      this.userToDelete = user
      this.showDelete = true
      console.log('@@@ => ', this.userToDelete)
    },
    borrarUsuario () {
      const url = `/users/${this.userToDelete.email}`
      console.log('@@ url => ', url)
      this.$axios.delete(url)
        .then((res) => {
          console.log('@@ res => ', res)
          if (res.status === 204) {
            this.showDelete = false
            this.userToDelete = null
            this.obtenerUsuarios()
          }
        })
        .catch((err) => {
          console.log('@@ err => ', err)
        })
    },
    updateUser (user) {
      this.upEmail = user.email
      this.upPassword = null
      this.upNombre = user.nombre
      this.upApaterno = user.apaterno
      this.upAmaterno = user.amaterno
      this.upDireccion = user.direccion
      this.upTelefono = user.telefono
      this.showEdit = true
    },
    saveUpdateUser () {
      const url = `/users/${this.upEmail}`
      const data = {
        email: this.upEmail,
        password: this.upPassword,
        nombre: this.upNombre,
        apaterno: this.upApaterno,
        amaterno: this.upAmaterno,
        direccion: this.upDireccion,
        telefono: this.upTelefono
      }
      this.$axios.put(url, data)
        .then((res) => {
          console.log('@@ res => ', res)
          if (res.data.message === 'success') {
            this.showEdit = false
            this.obtenerUsuarios()
          }
        })
        .catch((error) => {
          console.log('@@ error => ', error)
        })
    }
  }
}
</script>
