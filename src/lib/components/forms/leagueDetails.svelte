<script lang="ts">
  // 3rd Party Imports
  import { Step } from "@skeletonlabs/skeleton";
  // Type Imports
  import type { PageData } from "./$types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  export let data: PageData = {};
</script>

<Step>
  <span slot="header">League Details</span>
  <span>This is where you will create your league.</span>
  <label class="label">
    <span>League Name</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueName"
      id="leagueName"
      placeholder="League Name"
      maxlength="64"
      bind:value={$formStore.leagueName} />
  </label>
  <label class="label">
    <span>League Sport</span>
    <select
      class="select variant-form-material"
      name="leagueSport"
      bind:value={$formStore.leagueSport}>
      <option
        value="none"
        disabled
        selected>Select League Sport</option>
      {#each data.supportedSports as sport}
        <option value={sport.id}>{sport.name}</option>
      {/each}
    </select>
  </label>
</Step>
