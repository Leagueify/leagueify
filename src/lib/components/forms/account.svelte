<script lang="ts">
  export let form: { errors: Array<string> };
</script>

<!-- User Email -->
<label
  for="UserEmail"
  class="label">
  <span class="text-error-500">*</span>Email:
</label>
<input
  type="email"
  id="UserEmail"
  name="UserEmail"
  class="input variant-form-material" />

<!-- User Password -->
<label
  for="UserPassword"
  class="label">
  <span class="text-error-500">*</span>Password:
</label>
<input
  type="password"
  id="UserPassword"
  name="UserPassword"
  class="input variant-form-material" />

<!-- User Phone Number -->
<label
  for="UserPhone"
  class="label">
  <span class="text-error-500">*</span>Phone Number:
</label>
<input
  type="tel"
  id="UserPhone"
  name="UserPhone"
  class="input variant-form-material" />
