<script lang="ts">
  // 3rd Party Imports
  import { Step, Stepper } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  // Type Imports
  import type { PageData } from "./$types";
  // Leagueify Imports
  import Form from "$lib/components/forms.svelte";
  import AccountDetails from "$lib/components/forms/accountDetails.svelte";
  import DivisionDetails from "$lib/components/forms/divisionDetails.svelte";
  import EmailConfig from "$lib/components/forms/emailConfig.svelte";
  import LeagueDetails from "$lib/components/forms/leagueDetails.svelte";
  import SportDetails from "$lib/components/forms/sportDetails.svelte";
  // Variables
  export let data: PageData;
  let onComplete: any;
</script>

<svelte:head>
  <title>Install Leagueify</title>
</svelte:head>

{#if !$page.data.installedState}
  <div class="card p-4 !bg-transparent">
    <Form action="?/install">
      <Stepper
        slot="formContent"
        buttonCompleteLabel="Submit"
        buttonCompleteType="submit"
        on:complete|once={onComplete}>
        <Step>
          <span slot="header">Welcome to Leagueify</span>
          <span
            >We will now guide you through the quick and easy installation
            process for Leagueify.</span>
        </Step>
        <LeagueDetails {data} />
        <DivisionDetails bind:onComplete />
        <SportDetails />
        <EmailConfig />
        <AccountDetails />
      </Stepper>
    </Form>
  </div>
{:else}
  <span>Please verify your account.</span>
{/if}

<style>
  .card {
    max-width: 400px !important;
  }
</style>
