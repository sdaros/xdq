<template>
<v-layout
  row
  justify-center
  align-center
  >
  <v-flex xs12 md12 lg10 xl8>
    <v-layout row wrap align-center>
      <v-flex xs9>
       <h1 class="display-1 font-weight-light pt-4 pb-4 page-title">
        Evaluations
      </h1>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex>
        <v-btn outline color="grey">
          <v-icon class="pr-1 pb-1">add</v-icon>
          Create new evaluation
        </v-btn>
      </v-flex>
      <v-flex xs12>
      <v-divider class="mt-3 mb-4"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout>
      <p>
        Nothing to see here yet.
      </p>
    </v-layout>
  </v-flex>
</v-layout>
</template>
