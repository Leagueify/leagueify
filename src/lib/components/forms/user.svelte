<div class="mb-3">
  <h2>User</h2>
  <div class="row g-2">
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          required
        />
        <label for="firstName">First Name</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          required
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
          id="month"
          name="month"
          placeholder="MM"
        />
        <label for="month">Month</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="day"
          name="day"
          placeholder="DD"
        />
        <label for="day">Day</label>
      </div>
    </div>
    <div class="col-md">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="year"
          name="year"
          placeholder="YYYY"
        />
        <label for="year">Year</label>
      </div>
    </div>
  </div>
  <div class="form-floating mb-3">
    <input
      type="tel"
      class="form-control"
      id="phone"
      name="phone"
      placeholder="example@leagueify.org"
      maxlength="10"
      required
    />
    <label for="phone">Phone Number</label>
  </div>
  <div class="form-floating mb-3">
    <input
      type="email"
      class="form-control"
      id="email"
      name="email"
      placeholder="example@leagueify.org"
      required
    />
    <label for="email">Email Address</label>
  </div>
  <div class="form-floating mb-3">
    <input
      type="password"
      class="form-control"
      id="password"
      name="password"
      placeholder="Password"
      minlength="8"
      required
    />
    <label for="password">Password</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="coach"
      name="coach"
      value="true"
    />
    <label class="form-check-label" for="coach">Coach</label>
  </div>
  <div class="form-check form-check-inline">
    <input
      class="form-check-input"
      type="checkbox"
      id="volunteer"
      name="volunteer"
      value="true"
    />
    <label class="form-check-label" for="volunteer">Volunteer</label>
  </div>
</div>
