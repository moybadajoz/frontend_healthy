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
      fluid
      style="display: flex; flex-wrap: wrap; justify-content: space-around;"
    >
      <div
        v-for="medicina in medicinas"
        :key="medicina.nombre"
        style="width: 30%; height: 40vh;"
      >
        <v-card
          rounded
          color="#FEB2A0"
          style="border-radius: 20px!important; height: 30vh;"
        >
          <v-card-title style="justify-content: center;">
            <v-avatar
              color="#555"
              width="11vh"
              height="11vh"
            >
              <v-img :src="require(`@/assets/images/medicinas/${medicina.imagen}.jpg`)" />
            </v-avatar>
          </v-card-title>
          <v-card-subtitle style="display: grid;" class="mt-0">
            <h3 style="justify-self: center;">
              {{ medicina.nombre }}
            </h3>
          </v-card-subtitle>
          <v-card-text>
            <h3>
              {{ medicina.descripcion }}
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
  auth: true,
  data () {
    return {
      medicinas: [
        { nombre: 'Ibuprofeno', descripcion: 'Antiinflamatorio no esteroideo (AINE) utilizado para aliviar el dolor, la fiebre y la inflamación.', imagen: 'ibuprofeno' },
        { nombre: 'Paracetamol (Acetaminofén)', descripcion: 'Analgésico y antipirético utilizado para tratar el dolor y reducir la fiebre.', imagen: 'paracetamol' },
        { nombre: 'Amoxicilina', descripcion: 'Antibiótico de amplio espectro usado para tratar diversas infecciones bacterianas.', imagen: 'amoxicilina' },
        { nombre: 'Metformina', descripcion: 'Medicamento antidiabético que ayuda a controlar los niveles de azúcar en sangre en personas con diabetes tipo 2.', imagen: 'metformina' },
        { nombre: 'Loratadina', descripcion: 'Antihistamínico utilizado para aliviar los síntomas de alergias como estornudos, picazón y secreción nasal.', imagen: 'loratadina' },
        { nombre: 'Omeprazol', descripcion: 'Inhibidor de la bomba de protones que reduce la producción de ácido estomacal, utilizado para tratar el reflujo gastroesofágico y úlceras.', imagen: 'omeprazol' },
        { nombre: 'Atorvastatina', descripcion: 'Estatina que se usa para reducir los niveles de colesterol y prevenir enfermedades cardiovasculares.', imagen: 'atorvastatina' },
        { nombre: 'Aspirina (Ácido acetilsalicílico)', descripcion: 'AINE usado para aliviar el dolor, reducir la fiebre y actuar como anticoagulante para prevenir ataques cardíacos.', imagen: 'aspirina' },
        { nombre: 'Alprazolam', descripcion: 'Benzodiazepina utilizada para tratar trastornos de ansiedad y pánico.', imagen: 'alprazolam' }
      ]
    }
  }
}
</script>
