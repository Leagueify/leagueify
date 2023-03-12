<script lang="ts">
  export let form: { errors: Array<string> };
</script>

<!-- User Name -->
<label
  for="UserName"
  class="label">
  <span class="text-error-500">*</span>Full Name:
</label>
<input
  type="text"
  id="UserName"
  name="UserName"
  class="input variant-form-material" />

<!-- User Birth Date -->
<label
  for="UserBirthDate"
  class="label">
  <span class="text-error-500">*</span>Date of Birth:
</label>
<input
  type="date"
  id="UserBirthDate"
  name="UserBirthDate"
  class="input variant-form-material" />

<!-- User Shirt Size -->
<label
  for="UserShirtSize"
  class="label">
  <span class="label text-error-500">*</span>User Shirt Size:
</label>
<select
  id="UserShirtSize"
  name="UserShirtSize"
  class="select variant-form-material">
  <option
    disabled
    selected>Select Shirt Size</option>
  <option value="youth-small">Youth Small</option>
  <option value="youth-medium">Youth Medium</option>
  <option value="youth-large">Youth Large</option>
  <option value="youth-extra-large">Youth Extra Large</option>
  <option value="adult-small">Adult Small</option>
  <option value="adult-medium">Adult Medium</option>
  <option value="adult-large">Adult Large</option>
  <option value="adult-extra-large">Adult Extra Large</option>
</select>

<!-- User Roles -->
<div class="label">How I can Volunteer:</div>
<div class="space-y-2">
  <label class="flex items-center space-x-2">
    <input
      id=""
      name=""
      class="checkbox"
      type="checkbox" />
    <p>Cleaning</p>
  </label>
  <label class="flex items-center space-x-2">
    <input
      id=""
      name=""
      class="checkbox"
      type="checkbox" />
    <p>Coaching</p>
  </label>
  <label class="flex items-center space-x-2">
    <input
      id=""
      name=""
      class="checkbox"
      type="checkbox" />
    <p>Referee</p>
  </label>
  <label class="flex items-center space-x-2">
    <input
      id=""
      name=""
      class="checkbox"
      type="checkbox" />
    <p>Score Keeping</p>
  </label>
  <label class="flex items-center space-x-2">
    <input
      id=""
      name=""
      class="checkbox"
      type="checkbox" />
    <p>Snack Shack</p>
  </label>
</div>
