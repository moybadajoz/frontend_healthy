<template>
  <v-app>
    <v-main>
      <v-sheet
        class="pa-0 ma-0"
        width="100vw"
        color="#FFDEC8"
      >
        <v-row style="height: 101vh;">
          <v-col cols="6" style="margin-top: 2%;">
            <v-row align="center" justify="center">
              <h1>clinic patient's dashboard</h1>
            </v-row>
            <v-row align="center" justify="center" style="height: 115vh; display: flex; overflow: hidden; margin-top: -30%;">
              <v-img :src="require('@/assets/images/logo.svg')" />
            </v-row>
          </v-col>
          <v-col cols="6" align-self="center">
            <Nuxt />
          </v-col>
        </v-row>
      </v-sheet>
    </v-main>
  </v-app>
</template>
