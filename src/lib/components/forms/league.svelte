<script lang="ts">
  import { sports } from "$lib/stores";
  import type { RegisterError } from "$lib/types";

  export let form: { errors: RegisterError };
</script>

<div class="d-flex flex-column align-items-center mb-3">
  <h2>Welcome to Leagueify</h2>
  <div class="input-group mb-3 w-100">
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        class:border-danger={form?.errors?.leagueMissing ||
          form?.errors?.leagueShort}
        id="leagueName"
        name="leagueName"
        placeholder="League Name"
      />
      <label for="leagueName">League Name</label>
    </div>
    <span class="input-group-text mb-3" id="sport-selector">
      <select
        class="form-select"
        class:border-danger={form?.errors?.sportMissing}
        id="leagueSport"
        name="leagueSport"
        aria-label="Default select"
      >
        <option disabled selected value="">Select Sport</option>
        {#each $sports as sport}
          <option value={sport.toLowerCase()}>{sport}</option>
        {/each}
      </select>
    </span>
  </div>
</div>

<style></style>
