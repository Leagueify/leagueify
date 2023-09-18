<script lang="ts">
  // 3rd Party Imports
  import { InputChip, Step } from "@skeletonlabs/skeleton";
  // Type Imports
  // import type { PageData } from "./$types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  $formStore.leaguePositions = [];
  // Commented out until we render data errors
  // export const data: PageData = {};

  let locked = true;
  const onChange = () => locked = $formStore.leaguePositions.length === 0


</script>

<Step locked={locked}>
  <span slot="header">League Positions</span>
  <span
    >This is where you add positions for players within the {$formStore.leagueName}.
    Players will have the ability to select a desired position during the
    registration process.</span>
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">
    <strong>Player Positions</strong>
    <InputChip
      name="leaguePositions"
      placeholder="Player Positions"
      on:add={onChange}
      on:remove={onChange}
      bind:value={$formStore.leaguePositions} />
  </label>
</Step>
