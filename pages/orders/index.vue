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
        icon
      >
        <v-icon
          large
        >
          mdi-cart-outline
        </v-icon>
      </v-btn>
      <v-btn
        class="ml-3"
        icon
      >
        <v-icon
          large
        >
          mdi-clock-outline
        </v-icon>
      </v-btn>
    </v-row>
    <v-container
      class="mt-6"
    >
      <div
        style="width: 25%;"
      >
        <v-card
          rounded
          color="#F8000033"
          style="border-radius: 20px!important;"
        >
          <v-card-title style="justify-content: center;">
            <v-avatar
              color="#555"
              width="11vh"
              height="11vh"
            >
              <v-img :src="require('@/assets/images/orders/metformin.svg')" />
            </v-avatar>
          </v-card-title>
          <v-card-subtitle style="display: grid;" class="mt-0">
            <h3 style="justify-self: center;">
              Metformin
            </h3>
          </v-card-subtitle>
          <v-card-text>
            <h3>
              the first medicine prescribed for type 2 diabetes. It works mainly by lowering glucose production in the liver and improving the body's sensitivity to insulin so it uses insulin more effectively
            </h3>
          </v-card-text>
        </v-card>
        <v-row justify="center" class="mt-2">
          <v-btn
            rounded
            color="primary"
          >
            <h2>
              Add
            </h2>
          </v-btn>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>

export default {
  layout: 'dashboard',
  auth: true
}
</script>
