<script lang="ts">
  // 3rd Party Imports
  import { Step, Stepper } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  // Type Imports
  import type { PageData } from "./$types";
  // Leagueify Imports
  import Form from "$lib/components/forms.svelte";
  import AccountDetails from "$lib/components/forms/accountDetails.svelte";
  // Variables
  export let data: PageData;
  let onComplete: any;

  console.log($page);
</script>

<Form action="?/register">
  <Stepper
    slot="formContent"
    buttonCompleteLabel="Submit"
    buttonCompleteType="submit"
    on:complete|once={onComplete}>
    <Step>
      <span slot="header">Welcome to {$page.data.league.name}!</span>
      <span>Please create an account before registering players.</span>
    </Step>
    <AccountDetails {data} />
  </Stepper>
</Form>
