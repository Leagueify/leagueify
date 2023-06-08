<script lang="ts">
  // 3rd Party Imports
  import { Step, Table, tableMapperValues } from "@skeletonlabs/skeleton";
  // Type Imports
  import type { PageData } from "./types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  $formStore.leagueDivisions = [];
  export const data: PageData = {};
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
  <label class="label">
    <span>Division Details</span>
    <div
      class="input-group input-group-divider grid-cols-[auto_auto_auto_auto] variant-form-material">
      <input
        type="text"
        class="input variant-form-material"
        name="divisionName"
        id="divisionName"
        placeholder="Division Name"
        maxlength="16"
        bind:value={$formStore.divisionName} />
      <input
        type="number"
        class="input variant-form-material"
        name="divisionMinAge"
        id="divisionMinAge"
        placeholder="Min Age"
        maxlength="2"
        bind:value={$formStore.divisionMinAge} />
      <input
        type="number"
        class="input variant-form-material"
        name="divisionMaxAge"
        id="divisionMaxAge"
        placeholder="Max Age"
        maxlength="2"
        bind:value={$formStore.divisionMaxAge} />
      <button
        type="button"
        class="variant-filled-secondary"
        on:click={async () => {
          $formStore.leagueDivisions.push({
            name: $formStore.divisionName,
            minAge: $formStore.divisionMinAge,
            maxAge: $formStore.divisionMaxAge,
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
      source={{
        head: ["Name", "Min. Age", "Max. Age"],
        body: tableMapperValues($formStore.leagueDivisions, [
          "name",
          "minAge",
          "maxAge",
        ]),
      }} />
  {/if}
</Step>
