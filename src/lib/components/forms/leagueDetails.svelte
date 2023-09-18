<script lang="ts">
  // 3rd Party Imports
  import { Step } from "@skeletonlabs/skeleton";
  // Type Imports
  import type { PageData } from "./$types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
    import SportDetails from './sportDetails.svelte';
  // Variables
  export let data: PageData = {};
  
  let leagueNameCheck = true;
  let leagueCheck = true;
  
  let onInput = (e: any) => leagueNameCheck =  e.target.value.length >= 1 ? false : true;

  // let onLeagueSelect = (e: any) => leagueCheck = e.target.value !== 'none' ? false : true;
  let onLeagueSelect = (e: any) => leagueCheck = e.target.vaue !== "none" ? false : true;

  $: formLocked = leagueNameCheck === true || leagueCheck === true ? true : false


</script>

<Step locked={formLocked}>
  <span slot="header">League Details</span>
  <span
    >This is where you will create your league. Enter the name of your league,
    along with selecting the league sport from the dropdown.</span>
  <label class="label">
    <strong>League Name</strong>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueName"
      id="leagueName"
      placeholder="League Name"
      maxlength="64"
      on:input={onInput}
      bind:value={$formStore.leagueName} />
  </label>
  <label class="label">
    <strong>League Sport</strong>
    <select
      class="select variant-form-material"
      name="leagueSport"
      on:focus={onLeagueSelect}
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
