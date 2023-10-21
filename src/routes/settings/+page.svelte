<script lang="ts">
  // 3rd Party Imports
  import {
    Accordion,
    AccordionItem,
    ListBox,
    ListBoxItem,
  } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  // Type Imports
  import type { PageData } from "./$types";

  export let data: PageData;
  let activeSettingsPage = "Profile";
  let activeSettingsPanel = "Account";

  function handleSettingsPanelChange(
    selectedPanel: string,
    defaultPage: string
  ) {
    if (selectedPanel !== activeSettingsPanel) {
      activeSettingsPanel = selectedPanel;
      activeSettingsPage = defaultPage;
    }
  }
</script>

<div class="h-full w-full flex">
  <div class="w-1/4">
    <Accordion autocollapse>
      <AccordionItem
        open
        on:click={() => handleSettingsPanelChange("Account", "Profile")}>
        <svelte:fragment slot="lead"
          ><span class="material-icons-sharp">person</span></svelte:fragment>
        <svelte:fragment slot="summary">Account Settings</svelte:fragment>
        <svelte:fragment slot="content">
          <ListBox>
            <ListBoxItem
              bind:group={activeSettingsPage}
              name="settingsPage"
              value="Profile">Profile</ListBoxItem>
            <ListBoxItem
              bind:group={activeSettingsPage}
              name="settingsPage"
              value="Security">Security</ListBoxItem>
            <ListBoxItem
              bind:group={activeSettingsPage}
              name="settingsPage"
              value="Notifications">Notifications</ListBoxItem>
          </ListBox>
        </svelte:fragment>
      </AccordionItem>
      <!-- Hide League Settings for Users -->
      {#if $page.data.user.role !== "USER"}
        <AccordionItem
          on:click={() => handleSettingsPanelChange("League", "Details")}>
          <svelte:fragment slot="lead"
            ><span class="material-icons-sharp">leaderboard</span
            ></svelte:fragment>
          <svelte:fragment slot="summary">League Settings</svelte:fragment>
          <svelte:fragment slot="content">
            <ListBox>
              <ListBoxItem
                bind:group={activeSettingsPage}
                name="settingsPage"
                value="Details">Details</ListBoxItem>
              <ListBoxItem
                bind:group={activeSettingsPage}
                name="settingsPage"
                value="Scheduling">Scheduling</ListBoxItem>
              <ListBoxItem
                bind:group={activeSettingsPage}
                name="settingsPage"
                value="Registration">Registration</ListBoxItem>
              <ListBoxItem
                bind:group={activeSettingsPage}
                name="settingsPage"
                value="Rosters">Rosters</ListBoxItem>
              <ListBoxItem
                bind:group={activeSettingsPage}
                name="settingsPage"
                value="Email Configuration">Email Configuration</ListBoxItem>
            </ListBox>
          </svelte:fragment>
        </AccordionItem>
      {/if}
    </Accordion>
  </div>
  <div class="h-full w-full mx-auto flex justify-center items-center">
    Settings | {activeSettingsPanel} | {activeSettingsPage}
  </div>
</div>
