<template>
  <v-menu
    v-model="isMenuOpen"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="100"
    :disabled="readonly"
    z-index="2400"
  >
    <template v-slot:activator="{ props }">
      <v-form ref="form">
        <v-text-field
          active
          v-bind="props"
          v-model="formattedDate"
          :placeholder="placeholder"
          :density="density"
          prepend-inner-icon="mdi-calendar"
          :variant="variant"
          v-mask="'##/##/####'"
          :clearable="readonly == true ? false : clearable"
          :hint="hint"
          :hide-details="hideDetails"
          :persistent-placeholder="persistentPlaceholder"
          :persistent-hint="persistentHint"
          :rules="rules"
          :readonly="readonly"
          :disabled="disabled"
        >
          <template v-slot:label>
            <span class="required">{{ label }}</span>
          </template>
        </v-text-field>
      </v-form>
    </template>

    <v-date-picker
      v-model="selectedDate"
      hide-actions
      :title="title"
      :color="color"
      :readonly="readonly"
      :max="max"
      @input="dateChange()"
    >
      <template v-slot:header></template>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    modelValue: {
      type: String,
    },
    max: {
      type: String,
    },
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    density: {
      type: String,
    },
    title: {
      type: String,
    },
    color: {
      type: String,
      default: 'primary',
    },
    variant: {
      type: String,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    hint: {
      type: String,
    },
    hideDetails: {
      type: String,
    },
    persistentPlaceholder: {
      type: Boolean,
    },
    persistentHint: {
      type: Boolean,
    },
    rules: {
      type: Array,
    },
    readonly: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    isSearch: {
      type: Boolean,
    },
  },
  data() {
    return {
      isMenuOpen: false,
      selectedDate: null,
      formattedDate: '',
    }
  },
  computed: {
    parsedDate() {
      return this.selectedDate
        ? this.selectedDate.toLocaleDateString('th', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : ''
    },
  },
  watch: {
    modelValue() {
      this.formattedDate = this.modelValue
    },
    selectedDate() {
      this.isMenuOpen = false
      this.formattedDate = this.parsedDate
    },

    formattedDate() {
      this.updateSelectedDate()
      this.$emit('update:modelValue', this.formattedDate)
    },

    isSearch() {
      console.log('Rules')
      this.$refs.form.validate()
    },
  },
  methods: {
    dateChange() {
      this.formattedDate = this.parsedDate
    },
    updateSelectedDate() {
      if (!this.formattedDate || this.formattedDate.length !== 10) return

      const [day, month, year] = this.formattedDate.split('/')
      const formattedYear = parseInt(year, 10) - 543
      this.selectedDate = new Date(`${formattedYear}-${month}-${day}`)
    },
  },
  mounted() {
    this.formattedDate = this.modelValue
  },
}
</script>

<style>
.required::after {
  content: ' *';
  color: red;
  margin-right: 2px;
}
</style>
