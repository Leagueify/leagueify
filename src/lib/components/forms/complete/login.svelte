<script lang="ts">
  // Type Imports
  import type { PageData } from "./types";
  // Leagueify Imports
  import Form from "$lib/components/forms.svelte";
  import EmailPassword from "$lib/components/forms/emailPassword.svelte";
  // Variables
  export let data: PageData;
</script>

<Form action="register">
  <svelte:fragment slot="formContent">
    <EmailPassword {data} />
    <button
      class="btn variant-filled-primary"
      type="submit">Submit</button>
  </svelte:fragment>
</Form>
