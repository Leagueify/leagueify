<script lang="ts">
  import { Step } from "@skeletonlabs/skeleton";

  import { formData } from "$lib/stores";

  export let data: object;
  let formLocked = false;
  let leagueName = $formData.leagueName;
  let leagueSport = $formData.leagueSport;

  async function validateStep() {
    formLocked = leagueName.length >= 3 && leagueSport !== "none";
  }
</script>

<Step locked={!formLocked}>
  <span slot="header">League Details</span>
  <span> This is where you will specify your league name and sport.</span>
  <label class="label">
    <span>League Name</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueName"
      id="leagueName"
      placeholder="League Name"
      maxlength="64"
      bind:value={leagueName}
      on:input={validateStep} />
  </label>
  <label class="label">
    <span>League Sport</span>
    <select
      class="select variant-form-material"
      name="leagueSport"
      bind:value={leagueSport}
      on:change={validateStep}>
      <option
        value="none"
        disabled
        selected>Select League Sport</option>
      {#each data.supportedSports as sport}
        <option value={sport.name}>{sport.name}</option>
      {/each}
    </select>
  </label>
</Step>
