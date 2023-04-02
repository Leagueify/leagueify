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
      bind:value={$formData.leagueOutboundEmail} />
  </label>
  <label class="label">
    <span>SMTP Host</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPHost"
      placeholder="smtp.gmail.com"
      bind:value={$formData.leagueSMTPHost} />
  </label>
  <label class="label">
    <span>SMTP Port</span>
    <input
      type="number"
      class="input variant-form-material"
      name="leagueSMTPPort"
      placeholder="587"
      bind:value={$formData.leagueSMTPPort} />
  </label>
  <label class="label">
    <span>SMTP Username</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueSMTPUser"
      placeholder="SMTPUser"
      bind:value={$formData.leagueSMTPUser} />
  </label>
  <label class="label">
    <span>SMTP Password</span>
    <input
      type="password"
      class="input variant-form-material"
      name="leagueSMTPPass"
      placeholder="********"
      bind:value={$formData.leagueSMTPPass} />
  </label>
</Step>
