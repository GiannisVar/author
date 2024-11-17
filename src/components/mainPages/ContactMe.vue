<template>
  <div class="contact_me_page">
    <div class="contact_me_form">
      <Form ref="form" novalidate :validation-schema="schema" v-slot="{ errors }">
        <div class="contact_me_form-initial-infos">
          <div class="contact_me_form-field w-full sm:w-1/2">
            <label for="first_name">
              {{ $t('contactForm.firstName') }}
            </label>
            <Field type="text" name="first_name" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.firstName">
              <input v-bind="field" id="first_name" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
              <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
            </Field>
          </div>
          <div class="contact_me_form-field w-full sm:w-1/2">
            <label for="last_name">
              {{ $t('contactForm.lastName') }}
            </label>
            <Field  type="text" name="last_name" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.lastName">
              <input v-bind="field"  id="last_name" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
              <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
            </Field>
          </div>
        </div>
        <div class="contact_me_form-field w-full">
          <label for="email">
            {{ $t('contactForm.email') }}
          </label>
          <Field  type="text" name="email" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.email">
            <input v-bind="field" id="email" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
            <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
          </Field>
        </div>
        <div class="contact_me_form-field w-full">
          <label for="subject">
            {{ $t('contactForm.subject') }}
          </label>
          <Field  type="text" name="subject" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.subject">
            <input v-bind="field" id="subject" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
            <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
          </Field>
        </div>
        <div class="contact_me_form-field w-full">
          <label for="message">
            {{ $t('contactForm.message') }}
          </label>
          <Field  type="textarea" name="message" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.message">
            <textarea v-bind="field" id="message" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}" />
            <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
          </Field>
        </div>
        <button 
          class="contact_me_form-submit-button" 
          :class="{ 'contact_me_form-submit-button--error' : isFormFieldsEmpty || !!Object.keys(errors).length }" 
          :disabled="isFormFieldsEmpty || !!Object.keys(errors).length || isSubmitting" 
          @click="submit">{{ $t('buttons.submit') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';

export default {
  name: 'ContactMe',
  components: {
    Form,
    Field 
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      }
    }
  },
  created() {
    this.schema = yup.object({
      first_name: yup.string().required().label(this.$t('contactForm.firstName')),
      last_name: yup.string().required().label(this.$t('contactForm.lastName')),
      email: yup.string().required().email().label(this.$t('contactForm.email')),
      subject: yup.string().required().label(this.$t('contactForm.subject')),
      message: yup.string().required().label(this.$t('contactForm.message')),
    });
  },
  mounted() {
    if(this.$route.query?.purchaseMode) {
      this.$refs.form.setFieldValue('subject', this.$t('contactForm.purchaseMode.subject'));
      this.$router.replace({'query': null});
    }
  },
  computed: {
    isFormFieldsEmpty() {
      return Object.values(this.form).some(val => val === '');
    }
  },
  methods: {
    submit(event) {
      this.isSubmitting = true;
      event.preventDefault();
      const toaster = toast('Please wait...',
        {
          type: 'loading',
          position: toast.POSITION.BOTTOM_RIGHT,
          transition: toast.TRANSITIONS.SLIDE,
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        },
      );
      this.sendEmail(toaster);
    },
    sendEmail(toaster) {
      emailjs
        .send(
          process.env.VUE_APP_EMAILJS_SERVICE, 
          process.env.VUE_APP_EMAILJS_TEMPLATE, 
          {
            from_name: `${this.form.firstName} ${this.form.lastName}`, 
            reply_to: this.form.email, 
            subject: this.form.subject,
            message: this.form.message,
          }, {
          publicKey: process.env.VUE_APP_EMAILJS_PUBLIC_KEY,
        })
        .then(() => {
          this.updateToast(toaster, 'success', this.$t('toastrMessages.success'));
          this.isSubmitting = false;
          this.$refs.form.resetForm();
        })
        .catch(() => {
          this.updateToast(toaster, 'error', this.$t('toastrMessages.error'));
          this.isSubmitting = false;
        })
    },
    updateToast(toaster, type, message) {
      toast.update(toaster, {
        render: message,
        type: type,
        theme: 'colored',
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: true,
        closeButton: true,
        autoClose: 3000,
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.contact_me_form {
  &-initial-infos {
    @apply w-full flex flex-col;
    @screen sm {
      @apply flex-row gap-4;
    }
  }
  &-field {
    @apply relative mt-7;
    label {
      @apply block text-gray-500 text-sm mb-2;
      @screen sm {
        @apply text-base;
      }
    }
    &-form {
      @apply shadow bg-gray-200 appearance-none rounded w-full py-2 px-4 text-gray-500 leading-tight text-sm;
      @screen sm {
        @apply text-base;
      }
      &:focus {
        @apply bg-white border border-gray-500 outline-none;
      }
      &--error {
        @apply border border-error-500;
      }
    }
    &-error-message {
      @apply text-error-700 text-xs absolute left-0;
      bottom: -20px;
    }
  }
  &-submit-button {
    @apply flex cursor-pointer bg-white mx-auto hover:bg-gray-100 text-gray-500 py-2 px-4 border border-gray-200 rounded shadow mt-6;
    &--error {
      @apply cursor-not-allowed hover:bg-white;
    }
  }
}
</style>
