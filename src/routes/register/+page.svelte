<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  import League from "$lib/components/forms/league.svelte";
  import User from "$lib/components/forms/user.svelte";

  export let data: PageData;
  export let form: { errors: Array<string> };
</script>

<div class="d-flex justify-content-center vh-100 vw-100">
  <div class="card h-auto w-25 align-self-center">
    <div class="card-body">
      <form method="POST" novalidate use:enhance>
        {#if !data.installed}
          <League {form} />
        {/if}
        <User {form} />
        <button class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</div>
