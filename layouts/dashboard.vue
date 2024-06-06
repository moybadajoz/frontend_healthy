<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      color="#FFDEC8"
      width="200px"
    >
      <v-img :src="require('@/assets/images/logo_dashboard.svg')" />

      <v-list shaped>
        <v-list-item-group
          v-model="selectedItem"
          active-class="purple white--text"
          max="1"
        >
          <v-list-item
            v-for="[icon, text, ruta] in links"
            :key="icon"
            link
            :to="ruta"
            class="mb-5"
          >
            <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template #append>
        <div class="mb-6">
          <v-row justify="center" class="mt-3">
            <v-avatar
              color="#555"
            >
              <v-icon
                color="#FFF"
              >
                mdi-account
              </v-icon>
            </v-avatar>
          </v-row>
          <v-row justify="center">
            {{ getUser.name }}
          </v-row>
          <v-row justify="center" class="mt-7">
            {{ getUser.email }}
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>
    <AlertMessage
      v-if="showAlert"
      :type="type"
      :color="color"
      :border="border"
      :alert-text="text"
    />
    <v-main style="background-color: #FFF4EC;">
      <v-container
        class="py-8 px-6"
        fluid
      >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data: () => ({
    drawer: null,
    selectedItem: 1,
    showAlert: false,
    links: [
      ['mdi-view-dashboard-outline', 'Dashboard', '/dashboard'],
      ['mdi-calendar-month', 'Schedule', '/schedule'],
      ['mdi-bed-outline', 'Patients', '/patients'],
      ['mdi-cart-outline', 'Orders', '/orders']
    ]
  }),
  computed: {
    ...mapState(['user']),
    ...mapGetters(['getUser'])
  },
  created () {
    this.$nuxt.$on('show-alert', $event => this.cambiaDatos($event))
  },
  methods: {
    cambiaDatos (datos) {
      this.color = datos.color
      this.type = datos.type
      this.text = datos.text
      this.border = datos.border
      this.width = datos.width
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, datos.time)
    }
  }
}
</script>
