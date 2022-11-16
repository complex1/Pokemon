<template>
  <div class="apps">
    <svg
      width="21"
      height="40"
      viewBox="0 0 21 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4998 3.20581L3.99976 3.20581C3.44747 3.20581 2.99976 3.65353 2.99976 4.20581L2.99976 87.2058C2.99976 87.7581 3.44747 88.2058 3.99976 88.2058L19.4998 88.2058"
        stroke="url(#paint0_linear_529_181)"
        stroke-width="5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_529_181"
          x1="1.99972"
          y1="-4.80005"
          x2="20.9997"
          y2="94.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#66E2FD" />
          <stop offset="1" stop-color="#CF75F9" />
        </linearGradient>
      </defs>
    </svg>
    <div class="apps-icon" @click="$router.push('/pikachu')">
      <img src="@image/pikachu.png" alt="" />
    </div>
    <div class="apps-icon" @click="$router.push('/taskmanage')">
      <img src="@image/pikachu.png" alt="" />
    </div>
    <svg
      width="21"
      height="40"
      viewBox="0 0 21 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 88.2L17.4989 88.0058C18.0511 87.9993 18.4935 87.5464 18.487 86.9942L17.5106 3.99989C17.5041 3.44765 17.0512 3.00523 16.4989 3.01173L1 3.19407"
        stroke="url(#paint0_linear_529_183)"
        stroke-width="5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_529_183"
          x1="19.5929"
          y1="95.9876"
          x2="-0.570344"
          y2="-2.78203"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#66E2FD" />
          <stop offset="1" stop-color="#CF75F9" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.apps {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  right: 10px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  &-icon {
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    border-radius: 5.6px;
    padding: 5px;
    transition-property: transform, background, box-shadow;
    transition-duration: 0.1s;
    transition-timing-function: ease-in-out;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.6);
      box-shadow: -4px -4px 4px rgba(255, 255, 255, 0.25),
        4px 4px 8px rgba(255, 255, 255, 0.29);
      transform: scale(1.2);
    }
    & ~ & {
      margin-left: 10px;
    }
  }
}
</style>