<script lang="ts">
  import { Stepper, Step } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";

  import { formData, leagueStore } from "$lib/stores";

  import Account from "$lib/components/forms/account.svelte";
  import EmailConfig from "$lib/components/forms/emailConfig.svelte";
  import League from "$lib/components/forms/league.svelte";

  export let data: object;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <form
    method="post"
    novalidate
    on:keydown={(event) => event.key === "Enter" && event.preventDefault()}
    use:enhance={({ data }) => {
      console.log($formData);
      for (const [key, value] of Object.entries($formData)) {
        data.set(key, value);
      }
    }}>
    <Stepper
      buttonCompleteLabel="Submit"
      buttonCompleteType="submit"
      buttonNextType="button">
      <!-- Only show if Leagueify is not installed -->
      {#if !$leagueStore.installed}
        <Step>
          <span slot="header">Welcome to Leagueify!</span>
          We will now guide you through the process of installing Leagueify.
        </Step>
        <League {data} />
        <EmailConfig />
      {/if}
      <Account />
    </Stepper>
  </form>
</div>
