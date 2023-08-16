<script lang="ts">
  // 3rd Party Imports
  import { Step, Table, tableMapperValues } from "@skeletonlabs/skeleton";
  // Type Imports
  // import type { PageData } from "./$types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  $formStore.leagueDivisions = [];
  // Commented out until we render data errors
  // export const data: PageData = {};
  // Functions
  export async function onComplete() {
    $formStore.leagueDivisions = JSON.stringify($formStore.leagueDivisions);
    // Removing unused formStore values
    delete $formStore.divisionName;
    delete $formStore.divisionMinAge;
    delete $formStore.divisionMaxAge;
  }
</script>

<Step>
  <span slot="header">League Divisions</span>
  <span
    >This is where you will create divisions for {$formStore.leagueName}.</span>
  <span class="divisionAssignment"
    >Age Group<SlideToggle
      name="division"
      id="division"
      background="bg-surface-900 dark:bg-surface-300"
      bind:checked={$formStore.isCustom} />Manually</span>
  <label class="label">
    <span>Division Details</span>
    <div
      class="input-group input-group-divider variant-form-material {$formStore.isCustom
        ? 'grid-cols-[auto_auto]'
        : 'grid-cols-[auto_auto_auto_auto]'}">
      <input
        type="text"
        class="input variant-form-material"
        name="divisionName"
        id="divisionName"
        placeholder="Name"
        maxlength="16"
        bind:value={$formStore.divisionName} />
      {#if !$formStore.isCustom}
        <input
          type="number"
          class="input variant-form-material"
          name="divisionMinAge"
          id="divisionMinAge"
          placeholder="Min"
          maxlength="2"
          bind:value={$formStore.divisionMinAge} />
        <input
          type="number"
          class="input variant-form-material"
          name="divisionMaxAge"
          id="divisionMaxAge"
          placeholder="Max"
          maxlength="2"
          bind:value={$formStore.divisionMaxAge} />
      {/if}
      <button
        type="button"
        class="variant-filled-secondary"
        on:click={async () => {
          if ($formStore.isCustom) {
            $formStore.divisionMinAge = 0;
            $formStore.divisionMaxAge = 0;
          }
          $formStore.leagueDivisions.push({
            name: $formStore.divisionName,
            minAge: $formStore.divisionMinAge,
            maxAge: $formStore.divisionMaxAge,
            isCustom: $formStore.isCustom,
          });
          $formStore.divisionName = "";
          $formStore.divisionMinAge = "";
          $formStore.divisionMaxAge = "";
        }}>Add Division</button>
    </div>
  </label>
  {#if $formStore.leagueDivisions.length}
    <hr />
    <Table
      source={!$formStore.isCustom
        ? {
            head: ["Name", "Min. Age", "Max. Age"],
            body: tableMapperValues($formStore.leagueDivisions, [
              "name",
              "minAge",
              "maxAge",
            ]),
          }
        : {
            head: ["Name"],
            body: tableMapperValues($formStore.leagueDivisions, ["name"]),
          }} />
  {/if}
</Step>

<style>
  .divisionAssignment {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
</style>
