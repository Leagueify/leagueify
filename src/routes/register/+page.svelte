<script lang="ts">
  import { enhance } from "$app/forms";
  import League from "$lib/components/forms/league.svelte";
  import User from "$lib/components/forms/user.svelte";
  import { leagueify } from "$lib/stores";
</script>

<form method="POST" use:enhance>
  {#if !$leagueify}
    <League />
  {/if}
  <User />
  <button class="btn btn-primary">Register</button>
</form>
