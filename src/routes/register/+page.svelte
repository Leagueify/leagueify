<script lang="ts">
  import League from "$lib/components/forms/league.svelte";
  import User from "$lib/components/forms/user.svelte";
  import { leagueify } from "$lib/stores";
</script>

<!-- Fix Bux with If Statement - It shows when league present -->
{#if !$leagueify}
  <League />
{/if}
<User />
