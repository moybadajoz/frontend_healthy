<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      color="#12A2C4"
    >
      <v-sheet>
        <v-img :src="require('@/assets/images/logo_dashboard.svg')" />
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item
          v-for="[icon, text, ruta] in links"
          :key="icon"
          link
          :to="ruta"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
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
export default {
  data: () => ({
    drawer: null,
    links: [
      ['mdi-account', 'Usuarios', '/dashboard/usuarios']
    ]
  })
}
</script>
