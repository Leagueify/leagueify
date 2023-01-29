<script lang="ts">
  import { sports } from "$lib/stores";

  export let form: { errors: Array<string> };
</script>

<div class="mb-3">
  <label
    for="leagueName"
    class="form-label"><span class="text-danger">*</span> League Name:</label>
  <input
    type="text"
    name="leagueName"
    id="leagueName"
    class="form-control" />
  {#if form?.errors?.includes("missingLeagueName") || form?.errors?.includes("incorrectLengthLeagueName")}
    <div
      id="leagueNameRequirements"
      class="form-text text-danger">
      League name must be between 3 and 64 characters.
    </div>
  {/if}
</div>
<div class="mb-3">
  <label
    for="leagueSport"
    class="form-label"><span class="text-danger">*</span> League Sport:</label>
  <select
    name="leagueSport"
    id="leagueSport"
    class="form-select"
    aria-label="Default select">
    <option
      disabled
      selected>Select Sport</option>
    {#each $sports as sport}
      <option value={sport.toLowerCase()}>{sport}</option>
    {/each}
  </select>
  {#if form?.errors?.includes("missingLeagueSport")}
    <div
      id="leagueSportRequirements"
      class="form-text text-danger">
      Please select a sport for the league.
    </div>
  {/if}
</div>

<div class="mb-3">
  <label
    for="outboundEmail"
    class="form-label"
    ><span class="text-danger">*</span> League Email Address:</label>
  <input
    type="email"
    name="outboundEmail"
    id="outboundEmail"
    class="form-control" />
  {#if form?.errors?.includes("emailMissing")}
    <div
      class="form-text text-danger"
      id="leagueOutboundEmail">
      Please provide the outbound league email address.
    </div>
  {/if}
</div>
