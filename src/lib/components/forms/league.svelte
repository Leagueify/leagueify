<script lang="ts">
  export let form: { errors: Array<string> };
</script>

<!-- League Name -->
<label
  for="LeagueName"
  class="label">
  <span class="text-error-500">*</span>League Name:
</label>
<input
  type="text"
  id="LeagueName"
  name="LeagueName"
  class="input variant-form-material" />

<!-- League Sport -->
<label
  for="LeagueSport"
  class="label">
  <span class="label text-error-500">*</span>League Sport:
</label>
<select
  id="LeagueSport"
  name="LeagueSport"
  class="select variant-form-material">
  <option
    disabled
    selected>Select Sport</option>
  <option value="football">Football</option>
  <option value="hockey">Hockey</option>
</select>

<!-- League Outbound Email Address -->
<label
  for="LeagueEmail"
  class="label">
  <span class="text-error-500">*</span>League Email:
</label>
<input
  type="text"
  id="LeagueEmail"
  name="LeagueEmail"
  class="input variant-form-material" />
