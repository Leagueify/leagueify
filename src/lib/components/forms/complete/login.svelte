<script lang="ts">
  // 3rd Party Imports
  import { getModalStore } from "@skeletonlabs/skeleton";
  // Type Imports
  // import type { PageData } from "./$types";
  // Leagueify Imports
  import Form from "$lib/components/forms.svelte";
  import EmailPassword from "$lib/components/forms/emailPassword.svelte";
  // Variables
  // Commented out until we render data errors
  // export const data: PageData = {};

  // Initialize Skeleton Stores
  const modalStore = getModalStore();
</script>

<div class="card p-4">
  <Form action="/account?/login">
    <svelte:fragment slot="formContent">
      <EmailPassword />
      <br />
      <button
        class="btn variant-filled-primary"
        type="submit"
        on:click={() => {
          modalStore.close();
        }}>Submit</button>
    </svelte:fragment>
  </Form>
</div>
