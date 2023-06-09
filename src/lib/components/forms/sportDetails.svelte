<script lang="ts">
  // 3rd Party Imports
  import { InputChip, Step } from "@skeletonlabs/skeleton";
  // Type Imports
  import type { PageData } from "./types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  $formStore.leaguePositions = [];
  export const data: PageData = {};
</script>

<Step>
  <span slot="header">Player Positions</span>
  <span
    >Please enter available player positions for {$formStore.leagueName}.</span>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <span>Player Positions</span>
    <InputChip
      name="leaguePositions"
      placeholder="Player Positions"
      bind:value={$formStore.leaguePositions} />
  </label>
</Step>
