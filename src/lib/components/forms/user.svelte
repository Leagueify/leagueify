<script lang="ts">
  export let form: { errors: Array<string> };
</script>

<div class="mb-3">
  <div class="row g-2">
    <div class="col-md">
      <div class="mb-3">
        <label
          for="firstName"
          class="form-label"
          ><span class="text-danger">*</span>First Name:</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          name="firstName"
          placeholder="First Name" />
        {#if form?.errors?.includes("firstNameMissing") || form?.errors?.includes("firstNameShort")}
          <div
            id="missingFirstName"
            class="form-text text-danger">
            First name is required.
          </div>
        {/if}
      </div>
    </div>
    <div class="col-md">
      <div class="mb-3">
        <label
          for="lastName"
          class="form-label"
          ><span class="text-danger">*</span>Last Name:</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          name="lastName"
          placeholder="Last Name" />
        {#if form?.errors?.includes("lastNameMissing") || form?.errors?.includes("lastNameShort")}
          <div
            id="missingLastName"
            class="form-text text-danger">
            Last name is required.
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="row g-2">
    <div class="col-md">
      <div class="mb-3">
        <label for="month"><span class="text-danger">*</span>Month:</label>
        <input
          type="text"
          class="form-control"
          id="month"
          name="month"
          placeholder="MM"
          maxlength="2" />
        {#if form?.errors?.includes("missingMonth")}
          <div
            id="missingMonth"
            class="form-text text-danger">
            Month is required.
          </div>
        {/if}
      </div>
    </div>
    <div class="col-md">
      <div class="mb-3">
        <label for="day"><span class="text-danger">*</span>Day:</label>
        <input
          type="text"
          class="form-control"
          id="day"
          name="day"
          placeholder="DD"
          maxlength="2" />
        {#if form?.errors?.includes("missingDay")}
          <div
            id="missingDay"
            class="form-text text-danger">
            Day is required.
          </div>
        {/if}
      </div>
    </div>
    <div class="col-md">
      <div class="mb-3">
        <label for="year"><span class="text-danger">*</span>Year:</label>
        <input
          type="text"
          class="form-control"
          id="year"
          name="year"
          placeholder="YYYY"
          maxlength="4" />
        {#if form?.errors?.includes("missingYear")}
          <div
            id="missingYear"
            class="form-text text-danger">
            Year is required.
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="mb-3">
    <label for="email"><span class="text-danger">*</span>Email Address:</label>
    <input
      type="email"
      class="form-control"
      id="email"
      name="email"
      placeholder="example@leagueify.org" />
    {#if form?.errors?.includes("emailMissing") || form?.errors?.includes("emailInvalid")}
      <div
        id="missingEmail"
        class="form-text text-danger">
        Email is required.
      </div>
    {/if}
  </div>
  <div class="mb-3">
    <label for="password"><span class="text-danger">*</span>Password:</label>
    <input
      type="password"
      class="form-control"
      id="password"
      name="password"
      placeholder="Password"
      minlength="12" />
    {#if form?.errors?.includes("passwordMissing") || form?.errors?.includes("passwordShort")}
      <div
        id="missingPassword"
        class="form-text text-danger">
        Password is required.
      </div>
    {/if}
  </div>
  <div class="mb-3">
    <label for="phone"><span class="text-danger">*</span>Phone Number:</label>
    <input
      type="tel"
      class="form-control"
      id="phone"
      name="phone"
      placeholder="example@leagueify.org"
      maxlength="10" />
    {#if form?.errors?.includes("phoneMissing") || form?.errors?.includes("phoneInvalid")}
      <div
        id="missingPhone"
        class="form-text text-danger">
        Phone number is required.
      </div>
    {/if}
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="coach"
      name="coach"
      value="true" />
    <label
      class="form-check-label"
      for="coach">Coach</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="volunteer"
      name="volunteer"
      value="true" />
    <label
      class="form-check-label"
      for="volunteer">Volunteer</label>
  </div>
</div>
