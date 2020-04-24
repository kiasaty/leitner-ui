<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card outlined class="pa-6 pt-0" :loading="isLoading">
              <v-toolbar color="white" flat>
                <v-toolbar-title class="ma-auto">Register</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @keyup.enter="register">
                  <v-text-field
                    ref="firstname"
                    label="First Name"
                    outlined
                    type="text"
                    v-model="fields.firstname"
                    :error-messages="serverErrors.firstname"
                    @keyup.enter="$refs.lastname.focus()"
                  ></v-text-field>
                  <v-text-field
                    ref="lastname"
                    label="Last Name"
                    outlined
                    type="text"
                    v-model="fields.lastname"
                    :error-messages="serverErrors.lastname"
                    @keyup.enter="$refs.email.focus()"
                  ></v-text-field>
                  <v-text-field
                    ref="email"
                    label="Email"
                    outlined
                    type="email"
                    v-model="fields.email"
                    :error-messages="serverErrors.email"
                    @keyup.enter="$refs.username.focus()"
                  ></v-text-field>
                  <v-text-field
                    ref="username"
                    label="Username"
                    outlined
                    type="username"
                    v-model="fields.username"
                    :error-messages="serverErrors.username"
                    @keyup.enter="$refs.password.focus()"
                  ></v-text-field>
                  <v-text-field
                    ref="password"
                    label="Password"
                    outlined
                    type="password"
                    v-model="fields.password"
                    :error-messages="serverErrors.password"
                    @keyup.enter="$refs.password_confirmation.focus()"
                  ></v-text-field>
                  <v-text-field
                    ref="password_confirmation"
                    label="Confirm Password"
                    outlined
                    type="password"
                    v-model="fields.password_confirmation"
                    @keyup.enter="register"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" text to="/login">Login</v-btn>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from '@/store'

export default {
  props: {
    source: String
  },

  data() {
    return {
      fields: {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: ""
      },
      serverErrors: {}
    };
  },

  computed: {
    isLoading() {
      return store.getters['server/isLoading']
    }
  },

  methods: {
    register() {
      store.dispatch('user/register', this.fields)
        .then( () => 
          this.$router.push({name: 'Home'})
        )
        .catch(error => 
          this.serverErrors = error.response.data.errors.detail
        );
    }
  }
};
</script>
