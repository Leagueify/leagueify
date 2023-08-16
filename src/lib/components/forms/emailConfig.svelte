<script lang="ts">
  // 3rd Party Imports
  import { Step } from "@skeletonlabs/skeleton";
  // Type Imports
  // import type { PageData } from "./$types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  // Commented out until we render data errors
  // export const data: PageData = {};
</script>

<Step>
  <span slot="header">League Email Configuration</span>
  <span>Configure your league's email settings.</span>
  <label class="label">
    <span>League Outbound Email</span>
    <input
      type="email"
      class="input variant-form-material"
      name="leagueOutboundEmail"
      placeholder="noreply@leagueify.org"
      maxlength="64"
      bind:value={$formStore.leagueOutboundEmail} />
  </label>
  <label class="label">
    <span>SMTP Host</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPHost"
      placeholder="smtp.gmail.com"
      maxlength="255"
      bind:value={$formStore.leagueSMTPHost} />
  </label>
  <label class="label">
    <span>SMTP Port</span>
    <input
      type="number"
      class="input variant-form-material"
      name="leagueSMTPPort"
      placeholder="465"
      maxlength="5"
      bind:value={$formStore.leagueSMTPPort} />
  </label>
  <label class="label">
    <span>SMTP Username</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPUser"
      placeholder="SMTPUser"
      maxlength="64"
      bind:value={$formStore.leagueSMTPUser} />
  </label>
  <label class="label">
    <span>SMTP Password</span>
    <input
      type="password"
      class="input variant-form-material"
      name="leagueSMTPPass"
      placeholder="********"
      maxlength="255"
      bind:value={$formStore.leagueSMTPPass} />
  </label>
</Step>
