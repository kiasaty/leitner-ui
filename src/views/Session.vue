<template>
  <v-container class="fill-height">

    <v-card outlined class="d-flex flex-column h-100 w-100">

      <v-toolbar flat dense>
        <v-btn icon @click="getPreviousCard" v-if="isPreviousCardReviewable">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn exact icon :to="{name: 'Box', params: {id: boxID}}">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>

        <v-card max-width="500" min-height="400" class="d-flex flex-column ma-auto">
          <v-card-text
            class="body-1 text-center grow"
            v-html="isCardFlipped ? card.back : card.front"
          >
          </v-card-text>
          <v-card-actions>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                >
                  <v-icon small>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span class="d-block">Level: {{ card.level }}</span>
              <span class="d-block">Deck: {{ card.deck }}</span>
              <span class="d-block" v-if="card.reviewed_at">Last review: {{ lastReview }}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-chip
              v-if="!card.reviewed_at"
              color="success"
              outlined
              small
            >
              New
            </v-chip>
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
          @click="reviewCard(0)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn
          ref="failure"
          class="ma-2"
          color="success"
          outlined
          fab
          @click="reviewCard(1)"
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
    lastReview() {
      if (!this.card.reviewed_at) return null

      let date = new Date(this.card.reviewed_at);

      let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      return `${months[date.getMonth()]} ${date.getDate()}`
    },
    ...mapGetters({
      card: 'session/getCard',
      isPreviousCardReviewable: 'session/isPreviousCardReviewable'
    })
  },

  created() {
    this.getNextCard()
  },

  methods: {
    getNextCard() {
      store.dispatch('session/next', this.boxID)
      .catch(
        this.startNextSession()
      )
    },
    startNextSession() {
      store.dispatch('session/start', this.boxID)
    },
    reviewCard(remember) {
      store.dispatch('session/review', {
        boxID:    this.boxID,
        remember: remember
      })
    },
    getPreviousCard() {
      store.dispatch('session/previous')
    },
  }, 
  watch: {
    card() {
      this.isCardFlipped = false
    }
  }
};
</script>