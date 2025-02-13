<header
  class="bg-gray-800 py-4 w-4/5 sm:w-[calc(100%-16rem)] h-20 sticky top-0 right-0 flex justify-center items-center"
>
  <h1 class="title gray-800"><span class="red">RED</span> NOTICE DASHBOARD</h1>
</header>

<style>
  .title {
    font-size: 2.5rem;
    font-weight: 700;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: white;
    text-align: center;
  }
  .red {
    -webkit-text-stroke-color: red;
  }
  @media (max-width: 780px) {
    .title {
      font-size: 1.7rem;
    }
  }
  @media (max-width: 550px) {
    .title {
      font-size: 1.5rem;
    }
    header {
      justify-content: flex-start;
    }
  }
  @media (max-width: 400px) {
    .title {
      font-size: 1.3rem;
    }
  }
</style>
