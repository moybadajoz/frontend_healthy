<template>
  <div>
    <v-row>
      <v-col cols="2" />
      <v-col cols="8">
        <v-text-field
          outlined
          dense
          rounded
          hide-details
        />
      </v-col>
      <v-col cols="2">
        <v-icon
          x-large
        >
          mdi-clock
        </v-icon>
      </v-col>
    </v-row>
    <v-row
      class="mx-15 mt-15"
      justify="center"
    >
      <v-col cols="auto">
        <v-img
          :src="require('@/assets/p-img.svg')"
          max-width="260"
        />
      </v-col>
      <v-col
        cols="auto"
        class="ml-2"
      >
        <v-row
          class="mt-1"
        >
          <h3>
            {{ patient.nombre }}
            {{ patient.apaterno }}
            {{ patient.amaterno }}
          </h3>
        </v-row>
        <v-row class="mt-5">
          <h4>
            <span>Age: {{ patient.edad }}</span>
            <span class="ml-10">Sex: {{ patient.sexo }}</span>
          </h4>
        </v-row>
        <v-row class="mt-5">
          <h5>
            Phone number: {{ patient.telefono }}
          </h5>
        </v-row>
        <v-row class="mt-5">
          <h5>
            Email: {{ patient.email }}
          </h5>
        </v-row>
        <v-row class="mt-5">
          <h5>
            Address: {{ patient.direccion }}
          </h5>
        </v-row>
      </v-col>
      <v-col cols="6" style="display: flex; justify-content: space-evenly; overflow-x: hidden;">
        <v-col cols="3" style="">
          <v-row justify="center">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="88"
              color="#2CAA00"
            >
              <span style="color: black; font-size: large;">{{ 88 }}%</span>
            </v-progress-circular>
          </v-row>
          <v-row class="mt-5" justify="center">
            <span style="font-size: xx-small;">81/72</span>
          </v-row>
          <v-row justify="center">
            <h6>Sugar</h6>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row justify="center">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="66"
              color="#2CAA00"
            >
              <span style="color: black; font-size: large;">{{ 66 }}%</span>
            </v-progress-circular>
          </v-row>
          <v-row class="mt-5" justify="center">
            <span style="font-size: xx-small;">118/120</span>
          </v-row>
          <v-row justify="center">
            <h6>Sugar</h6>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-row justify="center">
            <v-progress-circular
              :rotate="-90"
              :size="100"
              :width="15"
              :value="50"
              color="#2CAA00"
            >
              <span style="color: black; font-size: large;">{{ 50 }}%</span>
            </v-progress-circular>
          </v-row>
          <v-row class="mt-5" justify="center">
            <span style="font-size: xx-small;">118/90</span>
          </v-row>
          <v-row justify="center">
            <h6>Blood Pressire</h6>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
    <v-row style="justify-content: space-evenly;">
      <v-slide-group
        v-model="optionSelect"
        class="pa-4"
        mandatory
        @change="null"
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
    <v-row>
      <v-container
        v-if="optionSelect == 0"
      >
        <v-card
          min-height="15vh"
          color="#D9D9D9"
          style="border-radius: 20px;"
          class="pa-5"
        >
          <v-card-text style="font-weight: 600; font-size: medium">
            <v-row justify="space-between">
              <v-col cols="3">
                Dr. Paul
              </v-col>
              <v-col cols="3" style="display: flex; justify-content: flex-end;">
                01/01/2023 12:30
              </v-col>
            </v-row>
            <v-row class="ml-1">
              Codeino Linctus (G/5gal) x 400 Ml To Be Taken As Directed
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
      <v-container
        v-else-if="optionSelect == 1"
      >
        <v-row justify="center">
          <v-col cols="8">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-center" style="font-size: large;">
                    Date & Time
                  </th>
                  <th class="text-center" style="font-size: large;">
                    Treatment
                  </th>
                  <th class="text-center" style="font-size: large;">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in desserts"
                  :key="item.id"
                >
                  <td class="text-center">
                    {{ item.date }}
                  </td>
                  <td class="text-center">
                    {{ item.treatment }}
                  </td>
                  <td class="text-center">
                    {{ item.comments }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
      <!-- documents -->
      <v-container
        v-else-if="optionSelect == 2"
      >
        <v-row justify="center">
          <v-col cols="8">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-center" style="font-size: large;">
                    Date & Time
                  </th>
                  <th class="text-center" style="font-size: large;">
                    Treatment
                  </th>
                  <th class="text-center" style="font-size: large;">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in desserts"
                  :key="item.id"
                >
                  <td class="text-center">
                    {{ item.date }}
                  </td>
                  <td class="text-center">
                    {{ item.treatment }}
                  </td>
                  <td class="text-center">
                    <v-btn
                      icon
                    >
                      <v-icon>
                        mdi-download
                      </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
      <!-- payments -->
      <v-container
        v-else-if="optionSelect == 3"
      >
        <v-row class="mt-10">
          <v-col cols="8">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-center" style="font-size: large;">
                    Date & Time
                  </th>
                  <th class="text-center" style="font-size: large;">
                    Treatment
                  </th>
                  <th class="text-center" style="font-size: large;">
                    Payments
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in desserts"
                  :key="item.id"
                >
                  <td class="text-center">
                    {{ item.date }}
                  </td>
                  <td class="text-center">
                    {{ item.treatment }}
                  </td>
                  <td class="text-center">
                    {{ item.payment }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-col>
          <v-col cols="3">
            <v-card
              flat
              color="#FFC198"
              style="border-radius: 25px;"
            >
              <v-card-title style="justify-content: center;">
                Fully Paid
              </v-card-title>
              <v-card-text>
                <v-simple-table>
                  <tbody>
                    <tr
                      v-for="item in paid"
                      :key="item"
                    >
                      <td class="text-center" style="font-size: large;">
                        {{ item.text }}
                      </td>
                      <td class="text-center" style="font-size: large;">
                        {{ item.value }}
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card-text>
              <v-card-actions
                style="justify-content: center;"
              >
                <v-btn
                  color="green darken-4"
                  rounded
                  style="width: 80%;"
                >
                  <span style="text-transform: none; color: white;">
                    Advance To Pay
                  </span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  auth: true,
  data () {
    return {
      patient: {
        amaterno: null,
        apaterno: null,
        direccion: null,
        edad: null,
        email: null,
        nombre: null,
        sexo: null,
        telefono: null,
        userId: null
      },
      options: [
        ['Prescription'],
        ['Checkups'],
        ["Document's"],
        ['Payments']
      ],
      optionSelect: 0,
      desserts: [
        { id: 0, date: '01/01/2023 12:30', treatment: 'MRI', payment: '852.00', comments: 'Excess Amount Glucose' },
        { id: 1, date: '07/01/2023 1:30', treatment: 'CGD', payment: '352.00', comments: 'Control Blood Pressure' },
        { id: 2, date: '15/01/2023 13:30', treatment: 'VJB', payment: '120.00', comments: 'Fever' },
        { id: 3, date: '17/01/2023 15:30', treatment: 'TISSUE', payment: '5520.00', comments: 'Good Condition' },
        { id: 4, date: '21/01/2023 20:30', treatment: 'BONE', payment: '552.00', comments: 'Good Condition' },
        { id: 5, date: '27/01/2023 23:30', treatment: 'FULL BODY', payment: '365.00', comments: 'Good Condition' }
      ],
      paid: [
        { text: 'Total Amount', value: '$7761' },
        { text: 'Amount Paid', value: '$5761' },
        { text: 'Discount Amount', value: '$200' },
        { text: 'Deposit', value: '$1800' },
        { text: 'Balances', value: '$0' }
      ]
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getPatient()
  },
  methods: {
    getPatient () {
      const url = `/get-patient/${this.id}`
      this.$axios.get(url)
        .then((res) => {
          if (res.data.message === 'success') {
            console.log(res.data)
            this.patient = res.data.patient
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
.v-data-table {
  background-color: #FFF4EC;
}
.v-card__text .v-data-table {
  background-color: #FFC198;
}
td, th{
  border: none!important;
}
</style>
