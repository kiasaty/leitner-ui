<template>
  <v-container class="fill-height">

    <v-card class="d-flex flex-column h-100 w-100">

      <v-toolbar flat dense>
        <v-spacer></v-spacer>
        <v-btn icon :to="{name: 'Box', params: {id: boxID}}">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>

        <v-card max-width="500" min-height="400" class="d-flex flex-column ma-auto">
          <v-card-text class="display-1 text-center grow">
            {{ isCardFlipped ? card.back : card.front }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              ref="flip"
              icon
              @click="isCardFlipped = !isCardFlipped"
            >
              <v-icon small>mdi-replay</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          ref="success"
          class="ma-2"
          color="error"
          outlined
          fab
          @click="processCard(0)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          ref="failure"
          class="ma-2"
          color="success"
          outlined
          fab
          @click="processCard(1)"
        >
          <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>

    </v-card>

  </v-container>
</template>


<script>
import { mapGetters } from "vuex"
import store from '@/store'

export default {
  data: () => ({
    isCardFlipped: false,
  }),

  computed: {
    boxID() {
      return this.$route.params.id
    },
    ...mapGetters({
      card: 'session/getCard',
    })
  },

  created() {
    this.getNextCard()
  },

  methods: {
    getNextCard() {
      store.dispatch('session/next', this.boxID)
    },
    processCard(remember) {
      store.dispatch('session/process', {
        boxID:    this.boxID,
        remember: remember
      })
        .then(
          this.getNextCard()
        )
    },
  }
};
</script>