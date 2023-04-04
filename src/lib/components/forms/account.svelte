<script lang="ts">
  import { Step } from "@skeletonlabs/skeleton";

  import { formData } from "$lib/stores";
</script>

<Step>
  <span slot="header">Account Details</span>
  <span> Please enter your account details below.</span>
  <label class="label">
    <span>Your Name</span>
    <input
      type="text"
      class="input variant-form-material"
      name="userName"
      placeholder="Your Name"
      maxlength="32"
      bind:value={formData.userName} />
  </label>
  <label class="label">
    <span>Date of Birth</span>
    <input
      type="date"
      class="input variant-form-material"
      name="userDOB"
      placeholder="MM/DD/YYYY"
      bind:value={formData.userDOB} />
  </label>
  <label class="label">
    <span>Email Address</span>
    <input
      type="email"
      class="input variant-form-material"
      name="userEmail"
      placeholder="user@example.com"
      maxlength="64"
      bind:value={formData.userEmail} />
  </label>
  <label class="label">
    <span>Password</span>
    <input
      type="password"
      class="input variant-form-material"
      name="userPass"
      placeholder="********"
      maxlength="255"
      bind:value={formData.userPass} />
  </label>
  <label class="label">
    <span>Phone Number</span>
    <input
      type="tel"
      class="input variant-form-material"
      name="userPhone"
      placeholder="(555) 555-5555"
      maxlength="25"
      bind:value={formData.userPhone} />
  </label>
</Step>
