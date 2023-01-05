<script lang="ts">
  import { leagueify } from "$lib/stores";

  import League from "$lib/components/forms/league.svelte";
</script>

{#if !$leagueify}
  <League />
{/if}
