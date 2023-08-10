<script lang="ts">
  // 3rd Party Imports
  import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import "../app.postcss";
  import { page } from "$app/stores";
  import { AppBar, AppShell, Modal, modalStore } from "@skeletonlabs/skeleton";
  // Type Imports
  import type { ModalComponent, ModalSettings } from "@skeletonlabs/skeleton";
  // Leagueify Imports
  import LoginForm from "$lib/components/forms/complete/login.svelte";

  // Modals
  const modalComponentRegistry: Record<string, ModalComponent> = {
    // Login Modal
    loginModal: {
      ref: LoginForm,
    },
  };
  const modal: ModalSettings = {
    type: "component",
    component: modalComponentRegistry.loginModal,
  };
</script>

{#if $page.data.installedState !== "active"}
  <div class="container h-full mx-auto flex justify-center items-center">
    <slot />
  </div>
{:else}
  <Modal components={modalComponentRegistry} />
  <AppShell>
    <svelte:fragment slot="header">
      <AppBar
        gridColumns="grid-cols-3"
        slotDefault="place-self-center"
        slotTrail="place-content-end">
        <svelte:fragment slot="lead">
          <span class="material-icons-sharp">menu</span>
        </svelte:fragment>
        <a href="/">
          <img
            alt="League Logo"
            width="48px"
            src="Leagueify Logo.svg" />
        </a>
        <svelte:fragment slot="trail">
          {#if $page.data.user}
            <span>Hello, {$page.data.user.name}</span>
            <div class="btn-group !bg-transparent">
              <a
                href="/register"
                class="btn-icon !bg-transparent"
                data-sveltekit-preload-data="hover">
                <span class="material-icons-sharp">person_add_alt</span>
              </a>
              <button
                type="button"
                class="btn-icon !bg-transparent">
                <span class="material-icons-sharp">settings</span>
              </button>
              <!-- User Logout Button -->
              <form
                action="/account?/logout"
                method="POST">
                <button
                  type="submit"
                  class="btn-icon !bg-transparent">
                  <span class="material-icons-sharp">logout</span>
                </button>
              </form>
            </div>
          {:else}
            <button
              type="button"
              class="btn variant-ringed-tertiary"
              on:click={() => {
                modalStore.trigger(modal);
              }}>Login</button>
            <a
              href="/register"
              class="btn variant-filled-primary"
              data-sveltekit-preload-data="hover">Register</a>
          {/if}
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>
    <div class="container h-full mx-auto flex justify-center items-center">
      <slot />
    </div>
    <svelte:fragment slot="footer">Footer</svelte:fragment>
  </AppShell>
{/if}
