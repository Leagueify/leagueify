<script lang="ts">
  // Type Imports
  // import type { PageData } from "./$types";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  // Commented out until we render data errors
  // export const data: PageData = {};
</script>

<label class="label">
  <span>Email Address</span>
  <input
    type="email"
    class="input variant-form-material"
    name="userEmail"
    placeholder="user@example.com"
    maxlength="64"
    bind:value={$formStore.userEmail} />
</label>
<label class="label">
  <span>Password</span>
  <input
    type="password"
    class="input variant-form-material"
    name="userPass"
    placeholder="********"
    maxlength="255"
    bind:value={$formStore.userPass} />
</label>
