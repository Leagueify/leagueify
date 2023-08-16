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
  <span>Please enter your account details below.</span>
  <label class="label">
    <span>Your Name</span>
    <input
      type="text"
      class="input variant-form-material"
      name="userName"
      placeholder="Your Name"
      maxlength="32"
      bind:value={$formStore.userName} />
  </label>
  <label class="label">
    <span>Date of Birth</span>
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
    <span>Phone Number</span>
    <input
      type="tel"
      class="input variant-form-material"
      name="userPhone"
      placeholder="(555) 555-5555"
      maxlength="25"
      bind:value={$formStore.userPhone} />
  </label>
</Step>
