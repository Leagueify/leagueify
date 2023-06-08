<script lang="ts">
  // 3rd Party Imports
  import { Step, Stepper } from "@skeletonlabs/skeleton";
  // Type Imports
  import type { PageData } from "./types";
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

<div class="container h-full mx-auto flex justify-center items-center">
  <Form action="?/install">
    <Stepper
      slot="formContent"
      buttonCompleteLabel="Submit"
      buttonCompleteType="submit"
      on:complete={onComplete}>
      <Step>
        <span slot="header">Welcome to Leagueify!</span>
        <span
          >We will now guide you through the process of installing Leagueify.</span>
      </Step>
      <LeagueDetails {data} />
      <DivisionDetails
        {data}
        bind:onComplete />
      <SportDetails {data} />
      <EmailConfig {data} />
      <AccountDetails {data} />
    </Stepper>
  </Form>
</div>
