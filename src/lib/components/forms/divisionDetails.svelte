<script lang="ts">
  // 3rd Party Imports
  import {
    SlideToggle,
    Step,
    Table,
    tableMapperValues,
  } from "@skeletonlabs/skeleton";
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

  let divisionCounter = 0;


</script>

<Step locked={divisionCounter === 0}>
  <span slot="header">League Divisions</span>
  <span
    >This is where you will create divisions for the {$formStore.leagueName}.
    Players can be assigned to divisions by age group, or by the league
    administrators manually.</span>

  <h5>How will players be assigned to the divisions?</h5>
  <span class="divisionAssignment"
    >Age Group<SlideToggle
      name="division"
      id="division"
      background="bg-surface-900 dark:bg-surface-300"
      bind:checked={$formStore.isCustom} />Manually</span>
  <label class="label">
    <strong>Division Details</strong>
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
          min={0}
          max={130}
          maxlength="3"
          bind:value={$formStore.divisionMinAge} />
        <input
          type="number"
          class="input variant-form-material"
          name="divisionMaxAge"
          id="divisionMaxAge"
          placeholder="Max"
          min={0}
          max={130}
          maxlength="3"
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
        if ($formStore.divisionMaxAge > $formStore.divisionMinAge || $formStore.isCustom) {
          divisionCounter ++
          $formStore.leagueDivisions.push({
            name: $formStore.divisionName,
            minAge: $formStore.divisionMinAge,
            maxAge: $formStore.divisionMaxAge,
            isCustom: $formStore.isCustom,
          });
          $formStore.divisionName = "";
          $formStore.divisionMinAge = "";
          $formStore.divisionMaxAge = "";
        }
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
