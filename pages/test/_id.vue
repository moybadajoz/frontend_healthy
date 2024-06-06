<template>
  <v-container
    v-if="appt"
    ref="download"
    width="500px"
    height="500px"
  >
    <v-row>
      <v-avatar
        height="100px"
        width="100px"
        class="pl-10"
      >
        <v-img
          :src="require('@/assets/images/logo.svg')"
        />
      </v-avatar>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <h1>
            Doctor
          </h1>
        </v-row>
        <v-row>
          <h3>
            {{ appt.user.nombre }}
            {{ appt.user.apaterno }}
            {{ appt.user.amaterno }}
          </h3>
        </v-row>
        <v-row>
          Email: {{ appt.user.email }}
        </v-row>
        <v-row>
          Phone: {{ appt.user.telefono }}
        </v-row>
        <v-row>
          Address: {{ appt.user.direccion }}
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <h2>Date</h2>
        </v-row>
        <v-row>
          {{ new Date(appt.dateTimeStart._seconds*1000).toLocaleDateString() }}
          {{ (new Date(appt.dateTimeStart._seconds * 1000)).toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' }) }}
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <h2>
            Patient
          </h2>
        </v-row>
        <v-row>
          <h3>
            {{ appt.patient.nombre }}
            {{ appt.patient.apaterno }}
            {{ appt.patient.amaterno }}
          </h3>
        </v-row>
        <v-row>
          Age: {{ appt.patient.edad }}
          Sex: {{ appt.patient.sexo }}
        </v-row>
        <v-row>
          Email: {{ appt.patient.email }}
        </v-row>
        <v-row>
          Phone: {{ appt.patient.telefono }}
        </v-row>
        <v-row>
          Address: {{ appt.patient.direccion }}
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <h2>
            Appointment Details
          </h2>
        </v-row>
        <v-row>
          Treatment: {{ appt.treatment }}
        </v-row>
        <v-row>
          Prescription: {{ appt.prescription }}
        </v-row>
        <v-row>
          Comments: {{ appt.comments }}
        </v-row>
        <v-row>
          Payment: ${{ appt.payment }}.00
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { ref } from 'vue'
import { jsPDF } from 'jspdf'
import domtoimage from 'dom-to-image'

const download = ref(null)

export default {
  // layout: 'dashboard',
  auth: true,
  data () {
    return {
      appt: null
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getAppointment()
  },
  methods: {
    getAppointment () {
      const url = `/get-appointment-by-id/${this.id}`
      this.$axios.get(url)
        .then((res) => {
          // console.log('@@@ => ', res.data)
          if (res.data.message === 'success') {
            this.appt = res.data.appt
            this.onDownload()
          }
        })
        .catch((err) => {
          // this.emitAlert('something went wrong')
          console.log(err)
        })
    },
    onDownload () {
      console.log(download)
      // const pdfWidth = download.value.clientWidth
      // const pdfHeight = download.value.clientHeight

      // Convert HTML table to PNG image using dom-to-image
      domtoimage.toPng(download.value).then((imageData) => {
        // Create a new jsPDF document
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF('l', 'pt', [500, 500])
        // Add the PNG image to the PDF document
        pdf.addImage(imageData, 'PNG', 0, 0, 500, 500)
        // Save the PDF document
        pdf.save('table.pdf')
      })
    }
  }
}

</script>
