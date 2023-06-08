<script lang="ts">
  // 3rd Party Imports
  import { enhance } from "$app/forms";
  // Leagueify Imports
  import { formStore } from "$lib/stores";
  // Variables
  export let action: string;
  export const formData: object = {};
</script>

<!-- Submit on enter should be disabled to prevent form being submitted prematurely -->
<!-- on:keydown={(event) => event.key === "Enter" && event.preventDefault()} -->
<!-- Submit on enter needs to be enabled for InputChip to function as expected. -->

<form
  {action}
  method="post"
  novalidate
  use:enhance={({ formData }) => {
    for (const [key, value] of Object.entries($formStore)) {
      formData.set(key, String(value));
    }
  }}>
  <slot name="formContent" />
</form>
