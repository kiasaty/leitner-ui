<template>
  <section>

    <v-parallax
      dark
      src="../assets/vbanner.webp"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12" v-if="!isLoggedIn">
          <h1 class="display-1 font-weight-thin mb-4">Wanna memorize things effectively?!</h1>
          <v-btn to="/register" large class="ml-5 mt-2">Get Started</v-btn>
        </v-col>
        <v-col class="text-center" cols="12" v-else>
          <h1 class="display-1 font-weight-thin mb-4">Welcome {{ user.fullname }}!</h1>
          <v-btn to="/boxes" large class="ml-5 mt-2">Create Box</v-btn>
        </v-col>
      </v-row>
    </v-parallax>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      //
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      user:       'user/getUser',
    }),
  },
};
</script>