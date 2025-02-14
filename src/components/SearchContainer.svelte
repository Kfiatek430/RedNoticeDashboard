<script lang="ts">
  import { searchQuery } from "../stores/searchStore";
  import type { Country } from "../utils/CountriesStorage";
  import { fetchCountries } from "../utils/CountriesStorage";
  import { onMount } from "svelte";

  let firstName = "";
  let lastName = "";
  let country = "";
  let minAge = 0;
  let maxAge = 0;
  let freeText = "";
  let sex = "";

  const searchNotices = async () => {
    try {
      const baseUrl = "https://ws-public.interpol.int/notices/v1/red";
      const params = new URLSearchParams();

      console.warn(country);
      if (firstName) params.append("forename", firstName.toUpperCase());
      if (lastName) params.append("name", lastName.toUpperCase());
      if (country) params.append("nationality", country);
      if (minAge !== 0) params.append("ageMin", minAge.toString());
      if (maxAge !== 0) params.append("ageMax", maxAge.toString());
      if (freeText) params.append("freeText", freeText);
      if (sex) params.append("sexId", sex);

      console.log(firstName, lastName, country, minAge, maxAge, freeText, sex);

      params.append("page", "1");
      params.append("resultPerPage", "200");

      const response = await fetch(`${baseUrl}?${params.toString()}`);
      const data = await response.json();
      searchQuery.set(data._embedded?.notices || []);
    } catch (error) {
      console.error(error);
    }
  };

  let countries: Country[] = [];

  onMount(async () => {
    fetchCountries()
      .then((data) => {
        countries = data;
      })
      .catch((error) => {
        console.error(error);
    });
  });
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4 text-white">
  <p
    class="text-xl sm:text-xl md:text-xl font-bold tracking-wide underline decoration-sky-500"
  >
    Criminals Search
  </p>
  <div class="search-container">
    <label
      >First Name:
      <input type="text" bind:value={firstName} />
    </label>

    <label
      >Last Name:
      <input type="text" bind:value={lastName} />
    </label>

    <label
      >Country:
      <select id="countries" bind:value={country}>
        <option value="">Select Country</option>
        {#each countries as country}
          <option value={country.code} >
            <!-- <img
                src={`https://www.flagsapi.com/${country.code}/flat/24.png`}
                alt=""
                draggable="false"
                class="cursor-pointer"
              /> -->
            {country.name}
          </option>
        {/each}
      </select>
    </label>

    <div class="age-range flex flex-row gap-3">
      <label
        >Min. Age:
        <input class="age" type="number" bind:value={minAge} />
      </label>

      <label
        >Max. Age:
        <input class="age" type="number" bind:value={maxAge} />
      </label>
    </div>

    <label
      >Free Text:
      <input type="text" bind:value={freeText} />
    </label>

    <div class="sex flex gap-3">
      Sex:
      <label>
        <input
          type="radio"
          class="focus:ring-blue-800"
          bind:group={sex}
          value="M"
        /> Male
      </label>
      <label>
        <input
          type="radio"
          class="focus:ring-blue-800"
          bind:group={sex}
          value="F"
        /> Female
      </label>
    </div>

    <button
      class="px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mt-7"
      on:click={searchNotices}
    >
      Search
    </button>
  </div>
</div>

<style>
  .search-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 100%;
    color: white;
  }

  .search-container label {
    display: flex;
    flex-direction: column;
  }

  .search-container label input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgb(57, 65, 80);
    background-color: rgb(57, 65, 80);
    height: 40px;
  }

  .search-container select {
    padding: 4px;
    border: 2px solid rgb(57, 65, 80);
    border-radius: 5px;
    font-size: 16px;
    background-color: rgb(57, 65, 80);
    transition: background-color 0.3s ease-in-out;
    color: white;
    height: 40px;
  }

  .age {
    width: 50%;
    text-align: center;
    -moz-appearance: textfield;
  }

  .age::-webkit-outer-spin-button,
  .age::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .search-container input[type="radio"] {
    width: 10px;
    height: 10px;
  }

  .search-container input[type="radio"]:checked {
    background-color: white;
    border: 1px solid;
  }

  .sex label {
    display: flex;
    align-items: center;
  }
</style>
