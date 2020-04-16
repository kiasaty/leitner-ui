<template>
  <v-container>

    <v-btn
      dark
      fab rounded
      fixed bottom right
      class="pl-5 pr-3"
      color="primary"
      :to="{name: 'Session', params: {id: boxID}}"
    >
      Learn
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>

    <v-dialog v-model="dialogOpen" max-width="80%">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-textarea
                  solo
                  rows="7"
                  auto-grow
                  placeholder="Front of the card"
                  v-model="dialogFields.front"
                  :error-messages="serverErrors.front"
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
                <tiptap-vuetify
                  v-model="dialogFields.back"
                  :extensions="extensions"
                  placeholder="Back of the card"
                  min-height="140"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="endTask">Cancel</v-btn>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="save">Save & Close</v-btn>
          <v-btn color="blue darken-1" text @click="save(false)">Save & New</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-card outlined>
      <v-tabs
      >
        <v-tab>Cards</v-tab>
        <v-tab>About Box</v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="2">
                <v-btn
                  large
                  color="primary"
                  @click="dialogOpen = true"
                >
                  <v-icon>mdi-plus</v-icon>
                  Add Card
                </v-btn>
              </v-col>
              <v-spacer />
              <v-col cols="12" md="5">
                <v-text-field
                  v-model.trim="searchQuery"
                  type="search"
                  placeholder="Search"
                  outlined
                  rounded
                  single-line
                  append-icon="mdi-magnify"
                  @click:append="getCards"
                  @keydown.enter="getCards"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" v-for="card in cards" :key="card.id">
                <v-card min-height="200" class="d-flex flex-column">
                  <v-card-title>
                    {{ card.front }}
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn 
                      icon
                      @click="deleteItem(card)"
                    >
                      <v-icon small>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn 
                      class="mx-0 px-0"
                      icon
                      @click="editItem(card)"
                    >
                      <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>

            <div class="text-center mt-10">
              <v-pagination
                v-if="pageCount > 1"
                :value="currentPage"
                :length="pageCount"
                total-visible="10"
                circle
                @input="$router.push({name: 'Box', params: {boxID: boxID}, query: {page: $event}})"
              ></v-pagination>
            </div>
            
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="2">
                <p>Title:</p>
              </v-col>
              <v-col cols="12" sm="10">
                <p>{{ box.title }}</p>
              </v-col>
              <v-col cols="12" sm="2">
                <p>Creator:</p>
              </v-col>
              <v-col cols="12" sm="10">
                <p>{{ box.creator.fullname }}</p>
              </v-col>
              <v-col cols="12" sm="2">
                <p>Description:</p>
              </v-col>
              <v-col cols="12" sm="10">
                <p>{{ box.description }}</p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        
      </v-tabs>
    </v-card>

  </v-container>
</template>


<script>
import { mapGetters } from "vuex"
import store from '@/store'
import {
  TiptapVuetify, Heading, Bold, Italic, Strike, Underline,
  Link, Blockquote, History, HorizontalRule
} from 'tiptap-vuetify'

export default {

  components: { TiptapVuetify },

  data: () => ({
    dialogOpen: false,
    dialogFields: {
      id: null,
      front: null,
      back: null,
    },
    searchQuery: null,
    serverErrors: {},
    extensions: [
      History,
      Bold,
      Italic,
      Underline,
      Strike,
      Blockquote,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Link,
      HorizontalRule
    ],
  }),

  computed: {
    boxID() {
      return this.$route.params.id
    },
    isUpdateTask() {
      return !!this.dialogFields.id;
    },
    dialogTitle() {
      return this.isUpdateTask ? "Update Card" : "Create Card";
    },
    page() {
      return this.$route.query.page || 1
    },
    ...mapGetters({
      box:          'box/getBox',
      cards:        'card/getCards',
      currentPage:  'card/getCurrentPage',
      pageCount:    'card/getPageCount',
    })
  },

  created() {
    this.getBox()
    this.getCards()
  },

  methods: {
    getBox() {
      store.dispatch('box/fetchBox', this.boxID);
    },

    getCards() {
      store.dispatch('card/fetchCards', {
        boxID:  this.boxID,
        page:   this.page, 
        searchQuery: this.searchQuery
      })
    },

    storeCard() {
      return store.dispatch('card/createCard', {
        boxID:    this.boxID,
        formData: this.getFormData()
      })
        .catch(error => {
          this.serverErrors = error.response.data.errors.detail
          throw error
        });
    },

    updateCard() {
      return store.dispatch('card/updateCard', {
        boxID:    this.boxID,
        formData: this.getFormData()
      })
        .catch(error => {
          this.serverErrors = error.response.data.errors.detail
          throw error
        });
    },

    deleteCard() {
      return store.dispatch('card/deleteCard', { boxID: this.boxID })
        .catch(
          error => (this.serverErrors = error.response.data.errors.detail)
        );
    },

    getFormData() {
      let formData = new FormData()
      
      for (let field in this.dialogFields) {
        if (this.dialogFields[field]) {
          formData.append(field, this.dialogFields[field]);
        }
      }
      
      return formData;
    },

    editItem(item) {
      store.dispatch('card/setIndex', this.cards.indexOf(item))
      this.assignDialog(item)
      this.dialogOpen = true
    },

    deleteItem(item) {
      store.dispatch('card/setIndex', this.cards.indexOf(item))
      confirm("Are you sure?") && this.deleteCard()
      this.endTask()
    },

    endTask(closeDialogAfter = true) {
      this.resetDialog()
      if(closeDialogAfter) this.dialogOpen = false
      this.serverErrors = {}
      store.dispatch('box/unsetIndex')
    },

    save(closeDialogAfter = true) {
      
      let promise = this.isUpdateTask ? this.updateCard() : this.storeCard()

      promise.then(() => {
        this.endTask(closeDialogAfter)
      })
    },

    assignDialog(item) {
      this.dialogFields.id    = item.id
      this.dialogFields.front = item.front
      this.dialogFields.back  = item.back
    },

    resetDialog() {
      this.dialogFields.id    = null
      this.dialogFields.front = null
      this.dialogFields.back  = null
    },
  },  

  watch: {
    page(val) {
      val && this.getCards()
    },
    dialogOpen(val) {
      val || this.endTask()  // if dialogOpen got false (it is being closed), run the endTask method
    },
  },
};
</script>