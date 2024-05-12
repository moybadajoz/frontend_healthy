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
      >
        New patient
      </v-btn>
      <v-btn
        class="ml-3"
        color="primary"
        rounded
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
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  auth: true,
  data: () => ({
    selectedOption: 1,
    options: [
      ['Yesterday Schedule'],
      ['Today Schedule'],
      ['Tomorrow Schedule']
    ]
  })
}
</script>
