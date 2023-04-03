<script lang="ts">
  import { Step } from "@skeletonlabs/skeleton";

  import { formData } from "$lib/stores";

  export let data: object;
</script>

<Step>
  <span slot="header">League Details</span>
  This is where you will specify your league name and sport.
  <label class="label">
    <span>League Name</span>
    <input
      type="text"
      class="input variant-form-material"
      name="leagueName"
      id="leagueName"
      placeholder="League Name"
      maxlength="64"
      bind:value={$formData.leagueName} />
  </label>
  <label class="label">
    <span>League Sport</span>
    <select
      class="select variant-form-material"
      name="leagueSport"
      bind:value={$formData.leagueSport}>
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
