<template>
    <img src="@image/chat.svg" alt="chat">
</template>

<script>
import socket from "@/api/socket";
console.log(socket);
export default {
  name: "Chat",
  created() {
    // socket.setupSocketConnection();
  },
  beforeUnmount() {
    // socket.disconnect();
  }
}
</script>

<style>
</style>