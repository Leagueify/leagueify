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
  <span
    >Leagueify requires an SMTP connection to send email notifications. Please
    the outbound email address for the {$formStore.leagueName} along with the SMTP
    credentials below.</span>
  <label class="label">
    <strong>League Outbound Email</strong>
    <input
      type="email"
      class="input variant-form-material"
      name="leagueOutboundEmail"
      placeholder="noreply@leagueify.org"
      maxlength="64"
      bind:value={$formStore.leagueOutboundEmail} />
  </label>
  <label class="label">
    <strong>SMTP Host</strong>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPHost"
      placeholder="smtp.gmail.com"
      maxlength="255"
      bind:value={$formStore.leagueSMTPHost} />
  </label>
  <label class="label">
    <strong>SMTP Port</strong>
    <input
      type="number"
      class="input variant-form-material"
      name="leagueSMTPPort"
      placeholder="465"
      maxlength="5"
      bind:value={$formStore.leagueSMTPPort} />
  </label>
  <label class="label">
    <strong>SMTP Username</strong>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPUser"
      placeholder="SMTPUser"
      maxlength="64"
      bind:value={$formStore.leagueSMTPUser} />
  </label>
  <label class="label">
    <strong>SMTP Password</strong>
    <input
      type="password"
      class="input variant-form-material"
      name="leagueSMTPPass"
      placeholder="********"
      maxlength="255"
      bind:value={$formStore.leagueSMTPPass} />
  </label>
</Step>
