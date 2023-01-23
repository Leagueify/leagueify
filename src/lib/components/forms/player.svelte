<script lang="ts">
  export let form: { errors: Array<string> };
</script>

<div class="mb-3">
  <h2>Player</h2>
  <div class="row g-2">
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          class:border-danger={form?.errors?.includes("firstNameMissing") ||
            form?.errors?.includes("firstNameShort")}
          id="firstName"
          name="firstName"
          placeholder="First Name"
        />
        <label for="firstName">First Name</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          class:border-danger={form?.errors?.includes("lastNameMissing") ||
            form?.errors?.includes("lastNameShort")}
          id="lastName"
          name="lastName"
          placeholder="Last Name"
        />
        <label for="lastName">Last Name</label>
      </div>
    </div>
  </div>
  <div class="row g-2">
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          class:border-danger={form?.errors?.includes("dobMonthMissing") ||
            form?.errors?.includes("dobAccountRequirement")}
          id="month"
          name="month"
          placeholder="MM"
          maxlength="2"
        />
        <label for="month">Month</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          class:border-danger={form?.errors?.includes("dobDayMissing") ||
            form?.errors?.includes("dobAccountRequirement")}
          id="day"
          name="day"
          placeholder="DD"
          maxlength="2"
        />
        <label for="day">Day</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          class:border-danger={form?.errors?.includes("dobYearMissing") ||
            form?.errors?.includes("dobAccountRequirement")}
          id="year"
          name="year"
          placeholder="YYYY"
          maxlength="4"
        />
        <label for="year">Year</label>
      </div>
    </div>
  </div>
</div>
