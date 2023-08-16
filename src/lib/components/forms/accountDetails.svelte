<script lang="ts">
  // 3rd Party Imports
  import { Step } from "@skeletonlabs/skeleton";
  // Type Imports
  // import type { PageData } from "./$types";
  // Leagueify Imports
  import EmailPassword from "$lib/components/forms/emailPassword.svelte";
  import { formStore } from "$lib/stores";
  // Variables
  // Commented out until we render data errors
  // export const data: PageData = {};
</script>

<Step>
  <span slot="header">Account Details</span>
  <span
    >Upon email verification the account created during the registration process
    becomes the initial Master Admin for the {$formStore.leagueName}.</span>
  <label class="label">
    <strong>Your Name</strong>
    <input
      type="text"
      class="input variant-form-material"
      name="userName"
      placeholder="Your Name"
      maxlength="32"
      bind:value={$formStore.userName} />
  </label>
  <label class="label">
    <strong>Date of Birth</strong>
    <input
      type="date"
      class="input variant-form-material"
      name="userDOB"
      placeholder="MM/DD/YYYY"
      max="9999-12-31"
      bind:value={$formStore.userDOB} />
  </label>
  <EmailPassword />
  <label class="label">
    <strong>Phone Number</strong>
    <input
      type="tel"
      class="input variant-form-material"
      name="userPhone"
      placeholder="(555) 555-5555"
      maxlength="25"
      bind:value={$formStore.userPhone} />
  </label>
</Step>
