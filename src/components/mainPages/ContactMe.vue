<template>
  <div class="contact-me">
    <teleport to="body">
      <Transition class="terms-modal" v-if="displayTacModal" name="fade">
        <Modal @closeModal="changeModalStatus">
          <span v-html="$t('contactForm.termsAndConditions')"></span>
        </Modal>
      </Transition>
    </teleport>
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
              <Field type="text" name="last_name" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.lastName">
                <input v-bind="field"  id="last_name" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
                <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
              </Field>
            </div>
          </div>
          <div class="contact_me_form-field w-full">
            <label for="email">
              {{ $t('contactForm.email') }}
            </label>
            <Field type="text" name="email" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.email">
              <input v-bind="field" id="email" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
              <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
            </Field>
          </div>
          <div class="contact_me_form-field w-full">
            <label for="subject">
              {{ $t('contactForm.subject') }}
            </label>
            <Field type="text" name="subject" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.subject">
              <input v-bind="field" id="subject" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}">
              <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
            </Field>
          </div>
          <div class="contact_me_form-field w-full">
            <label for="message">
              {{ $t('contactForm.message') }}
            </label>
            <Field type="textarea" name="message" v-slot="{ field, errorMessage }" :validateOnInput="true" v-model="form.message">
              <textarea v-bind="field" id="message" class="contact_me_form-field-form" :class="{ 'contact_me_form-field-form--error' : !!errorMessage}" />
              <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
            </Field>
          </div>
          <div class="contact_me_form-field w-full flex">
            <Field v-slot="{ field, errorMessage }" name="terms" type="checkbox" :value="true" :unchecked-value="false">
                <input type="checkbox" name="terms" v-bind="field" :value="true" @change="changeTermsAcceptanceStatus" />
                <div class="ml-1">
                  <span>{{ $t('contactForm.terms1') }}</span>
                  <a class="contact_me_form-field-open-modal-link" @click="changeModalStatus">{{ $t('contactForm.terms2') }}</a>
                </div>
                <span class="contact_me_form-field-error-message">{{ errorMessage }}</span>
            </Field>
          </div>
          <div class="cf-turnstile"></div>
          <button
            class="contact_me_form-submit-button"
            :class="{ 'contact_me_form-submit-button--error' : isFormFieldsEmpty || !!Object.keys(errors).length }"
            :disabled="isFormFieldsEmpty || !!Object.keys(errors).length || isSubmitting"
            @click="submit">{{ $t('buttons.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from '@emailjs/browser';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import Modal from '../common/Modal';

export default {
  name: 'ContactMe',
  components: {
    Form,
    Field,
    Modal
  },
  data() {
    return {
      displayTacModal: false,
      isSubmitting: false,
      turnstileToken: '',
      form: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        terms: false,
      }
    }
  },
  created() {
    this.schema = yup.object({
      first_name: yup.string().required(this.$t('contactForm.errorMessages.required.firstName')).label(this.$t('contactForm.firstName')),
      last_name: yup.string().required(this.$t('contactForm.errorMessages.required.lastName')).label(this.$t('contactForm.lastName')),
      email: yup.string().required(this.$t('contactForm.errorMessages.required.email')).email(this.$t('contactForm.errorMessages.format.email')).label(this.$t('contactForm.email')),
      subject: yup.string().required(this.$t('contactForm.errorMessages.required.subject')).label(this.$t('contactForm.subject')),
      message: yup.string().required(this.$t('contactForm.errorMessages.required.message')).label(this.$t('contactForm.message')),
      terms: yup.boolean().isTrue(this.$t('contactForm.errorMessages.required.terms')),
    });
  },
  mounted() {
    window.onTurnstileSuccess = this.onTurnstileSuccess;
    const renderInterval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(renderInterval);
        window.turnstile.render('.cf-turnstile', {
          sitekey: process.env.TURNSTILE_SITE_KEY,
          callback: window.onTurnstileSuccess,
          theme: 'light',
        });
      }
    }, 100);
    if(this.$route.query?.purchaseMode) {
      this.$refs.form.setFieldValue('subject', this.$t('contactForm.purchaseMode.subject'));
      this.$router.replace({'query': null});
    }
  },
  computed: {
    isFormFieldsEmpty() {
      return Object.values(this.form).some(val => val === '' || val === false);
    }
  },
  methods: {
    changeTermsAcceptanceStatus(event) {
      this.form.terms = event.target.checked;
    },
    onTurnstileSuccess(token) {
      this.turnstileToken = token;
    },
    async submit(event) {
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
      try {
        const response = await fetch('https://turnstileverificationscript.giannis-vrchos.workers.dev', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'cf-turnstile-response': this.turnstileToken
          })
        });
        if(response.ok) {
          this.sendEmail(toaster);
        } else {
          this.updateToast(toaster, 'error', this.$t('toastrMessages.error'));
          this.isSubmitting = false;
        }
      } catch {
        this.updateToast(toaster, 'error', this.$t('toastrMessages.error'));
        this.isSubmitting = false;
      }
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
    changeModalStatus() {
      this.displayTacModal = !this.displayTacModal;
      this.$emit('displayModal', this.displayTacModal);
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-me {
  @apply relative;
  &--mask {
    @apply absolute w-screen h-screen opacity-80 bg-white z-10;
  }
  .terms-modal {
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 1s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
  }
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
      &-open-modal-link {
        @apply underline text-link cursor-pointer;
      }
      &-form {
        @apply shadow bg-gray-200 appearance-none rounded w-full py-2 px-4 text-gray-500 leading-tight text-sm border border-gray-200;
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
  .cf-turnstile {
    margin-top: 2em;
  }
}
</style>
