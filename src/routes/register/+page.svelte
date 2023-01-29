<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  import League from "$lib/components/forms/league.svelte";
  import User from "$lib/components/forms/user.svelte";

  export let data: PageData;
  export let form: { errors: Array<string> };
</script>

<div class="d-flex flex-column align-items-center mb-3">
  <h2>Welcome to Leagueify</h2>
  {#if !data.installed}
    <p>Create your League</p>
  {:else}
    <p>Create an Account</p>
  {/if}

  <form
    method="POST"
    novalidate
    use:enhance>
    {#if !data.installed}
      <League {form} />
    {:else}
      <User {form} />
    {/if}

    <button class="btn btn-primary" id="registerButton">
      {#if !data.installed}
        Create League
      {:else}
        Create Account
      {/if}
    </button>
  </form>
</div>
