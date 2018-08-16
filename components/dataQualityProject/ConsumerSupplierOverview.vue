<template>
  <v-layout row :reverse="reverse">
    <v-flex xs12 sm6 class="pr-2">
      <v-list two-line subheader>
        <v-subheader inset class="mb-2">
          Data Consumer
          <v-spacer></v-spacer>
          <v-avatar class="pt-5" tile size="80">
            <img src="~/assets/handel24-logo.png" alt="Burberry logo" />
          </v-avatar>
        </v-subheader>
        <v-list-tile
          avatar
          @click=""
          >
          <v-list-tile-action>
            <v-icon color="primary">location_city</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ dataConsumer.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ dataConsumer.location }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile
          avatar
          @click=""
          >
          <v-list-tile-action>
            <v-icon color="primary">phone</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ dataConsumer.phoneNumber }}</v-list-tile-title>
            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile
          avatar
          @click=""
          >
          <v-list-tile-action>
            <v-icon color="primary">email</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ dataConsumer.email }}</v-list-tile-title>
            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="grey lighten-1">chat</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-flex xs12 sm6>
      <v-list two-line subheader>
        <v-subheader inset class="mb-2">
          Data Supplier
          
          <v-spacer></v-spacer>
          <v-avatar class="pt-5" tile size="80">
            <img src="~/assets/textilfabrik-logo.png" alt="Burberry logo" />
          </v-avatar>
        </v-subheader>
        <v-list-tile
          avatar
          @click=""
          >
          <v-list-tile-action>
            <v-icon color="primary">location_city</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ dataSupplier.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ dataSupplier.location }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile
          avatar
          @click=""
          >
          <v-list-tile-action>
            <v-icon color="primary">phone</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ dataSupplier.phoneNumber }}</v-list-tile-title>
            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider inset></v-divider>
        <v-list-tile
          avatar
          @click=""
          >
          <v-list-tile-action>
            <v-icon color="primary">email</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ dataSupplier.email }}</v-list-tile-title>
            <v-list-tile-sub-title>Work</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon color="grey lighten-1">chat</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    loading: false,
    reverse: Boolean,
    dataConsumer: Object,
    dataSupplier: Object
  }
}
</script>
