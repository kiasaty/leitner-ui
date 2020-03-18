<template>
  <div>

    <v-app-bar app>

      <v-toolbar-title style="width: 300px">
        <span class="hidden-sm-and-down">Leitner</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn 
          v-if="isLoggedIn"
          text
          @click="logout"
        >Logout</v-btn>
        <v-btn
          v-else
          text
          :to="{name: 'Login'}"
        >Login</v-btn>
      </v-toolbar-items>

      <v-avatar v-if="isLoggedIn" color="teal" size="40" class="ml-4">
        <img
          v-if="user.profile_photo"
          :src="`${serverURL}/${user.profile_photo}`"
        >
        <span v-else class="white--text body-2" v-text="userInitials"></span>
      </v-avatar>

    </v-app-bar>
        
    <router-view/>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
        return {
          //
        }
    },

    computed: {
      ...mapGetters({
        isLoggedIn:   'user/isLoggedIn',
        user:         'user/getUser',
        userInitials: 'user/getUserInitials',
        serverURL:    'serverURL',
      }),
    },

    methods: {
      logout() {
        this.$store.dispatch('user/logout')
      }
    }

  }
</script>