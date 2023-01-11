<script lang="ts">
  import { enhance } from "$app/forms";

  import League from "$lib/components/forms/league.svelte";
  import User from "$lib/components/forms/user.svelte";
  import { leagueData } from "$lib/stores";
</script>

<div class="d-flex justify-content-center vh-100 vw-100">
  <div class="card h-auto w-25 align-self-center">
    <div class="card-body">
      <form method="POST" use:enhance>
        {#if !$leagueData.installed}
          <League />
        {/if}
        <User />
        <button class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</div>
