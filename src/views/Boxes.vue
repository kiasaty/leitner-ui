<template>
  <v-container>

    <v-dialog v-model="dialogOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ dialogTitle }}</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title"
                  v-model="dialogFields.title"
                  :error-messages="serverErrors.title"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  v-model="dialogFields.description"
                  :error-messages="serverErrors.description"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="endTask">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-data-table
      :headers="headers"
      :items="boxes"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat short>
          <v-toolbar-title>Boxes</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialogOpen = true"
          > 
            New
          </v-btn>

        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn 
          icon
          :to="{name: 'Box', params: {id: item.id}}"
        >
            <v-icon small>mdi-eye</v-icon>
        </v-btn>
        <v-btn 
          icon
          @click="editItem(item)"
        >
            <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn 
          icon
          @click="deleteItem(item)"
        >
            <v-icon small>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

  </v-container>
</template>


<script>
import { mapGetters } from "vuex"
import store from '@/store'

export default {
  data: () => ({
    dialogOpen: false,
    dialogFields: {
      id: null,
      title: null,
      description: null,
    },
    headers: [
      { text: 'Title',        value: 'title' },
      { text: 'Description',  value: 'description', sortable: false },
      { text: 'Actions',      value: 'action',      sortable: false,  align: 'end' },
    ],
    serverErrors: {},
  }),

  computed: {
    isUpdateTask() {
      return !!this.dialogFields.id;
    },
    dialogTitle() {
      return this.isUpdateTask ? "Update Box" : "Create Box";
    },
    ...mapGetters({
      boxes:    'box/getBoxes',
      box:      'box/getBox',
      boxIndex: 'box/getIndex',
      isAdmin:  'user/isAdmin',
    })
  },

  watch: {
    dialogOpen(val) {
      val || this.endTask()  // if openDialog got false (it is being closed), run the endTask method
    }
  },

  created() {
    this.getBoxes()
  },

  methods: {
    getBoxes () {
      store.dispatch('box/fetchBoxes')
    },

    storeBox() {
      return store.dispatch('box/createBox', this.getFormData())
        .catch(error => {
          this.serverErrors = error.response.data.errors.detail
          throw error
        });
    },

    updateBox() {
      return store.dispatch('box/updateBox', this.getFormData())
        .catch(error => {
          this.serverErrors = error.response.data.errors.detail
          throw error
        });
    },

    deleteBox() {
      return store.dispatch('box/deleteBox')
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
      store.dispatch('box/setIndex', this.boxes.indexOf(item))
      this.assignDialog(item)
      this.dialogOpen = true
    },

    deleteItem(item) {
      store.dispatch('box/setIndex', this.boxes.indexOf(item))

      confirm("Are you sure?") && this.deleteBox()

      this.endTask()
    },

    endTask() {
      this.resetDialog()
      this.dialogOpen = false
      this.serverErrors = {}
      store.dispatch('box/unsetIndex')
    },

    save() {
      
      let promise = this.isUpdateTask ? this.updateBox() : this.storeBox()

      promise.then(() => {
        this.endTask()
      })
    },

    assignDialog(item) {
      this.dialogFields.id          = item.id
      this.dialogFields.title       = item.title
      this.dialogFields.description = item.description
    },

    resetDialog() {
      this.dialogFields.id = null
      this.dialogFields.title = null
      this.dialogFields.description = null
    },
  }
};
</script>