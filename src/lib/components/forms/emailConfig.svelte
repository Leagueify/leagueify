<script lang="ts">
  import { Step } from "@skeletonlabs/skeleton";

  import { formData } from "$lib/stores";
</script>

<Step>
  <span slot="header">League Email Configuration</span>
  Configure your league's email settings.
  <label class="label">
    <span>League Outbound Email</span>
    <input
      type="email"
      class="input variant-form-material"
      name="leagueOutboundEmail"
      placeholder="noreply@leagueify.org"
      maxlength="64"
      bind:value={$formData.leagueOutboundEmail} />
  </label>
  <label class="label">
    <span>SMTP Host</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPHost"
      placeholder="smtp.gmail.com"
      maxlength="255"
      bind:value={$formData.leagueSMTPHost} />
  </label>
  <label class="label">
    <span>SMTP Port</span>
    <input
      type="number"
      class="input variant-form-material"
      name="leagueSMTPPort"
      placeholder="587"
      maxlength="5"
      bind:value={$formData.leagueSMTPPort} />
  </label>
  <label class="label">
    <span>SMTP Username</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPUser"
      placeholder="SMTPUser"
      maxlength="64"
      bind:value={$formData.leagueSMTPUser} />
  </label>
  <label class="label">
    <span>SMTP Password</span>
    <input
      type="password"
      class="input variant-form-material"
      name="leagueSMTPPass"
      placeholder="********"
      maxlength="255"
      bind:value={$formData.leagueSMTPPass} />
  </label>
</Step>
