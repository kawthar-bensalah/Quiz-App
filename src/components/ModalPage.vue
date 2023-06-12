<template>
<!-- Modal Page -->
  <div class="modal-overlay">
    <div class="modal">
      <!-- Pass / Fail -->
      <p class="result">{{ result }}</p>
      <p class="score">Your Score: {{ score }} / 10</p>
      <p class="timer">You spent: {{ timer }}</p>
      <p class="message">
        You did a great job, learn more by taking another quiz
      </p>
      <router-link to="/"><button>Restart</button></router-link>
    </div>
    <div class="close"></div>
  </div>
</template>

<script>
export default {
  props: ["result", "score", "timer"],
  setup() {},
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 40rem;
  width: 50rem;
  margin-top: 5%;
  padding: 40px 0;
  border-radius: 35px;
  display: flex;
  align-content: center;
}
p {
  font-size: 16px;
  margin: 20px 0;
}

.modal p {
  position: absolute;
  transform: translate(50%, -50%);
  margin: 5% auto 0;
  font-family: verdana;
  text-align: center;
  color: #ff6969;
}

.timer {
  font-size: 2em;
  font-weight: 300;
  top: 35%;
  right: 50%;
}

.score {
  font-size: 3em;
  font-weight: 400;
  top: 25%;
  right: 50%;
}
.result {
  text-transform: uppercase;
  font-size: 6em;
  font-weight: 600;
  top: 10%;
  right: 50%;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191,
    1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191,
    1px 7px 1px #919191, 1px 8px 1px #919191, 1px 9px 1px #919191,
    1px 10px 1px #919191, 1px 18px 6px rgba(16, 16, 16, 0.4),
    1px 22px 10px rgba(16, 16, 16, 0.5), 1px 25px 35px rgba(16, 16, 16, 0),
    1px 30px 60px rgba(16, 16, 16, 0);
}

.message {
  font-size: 1.5em;
  font-weight: 200;
  top: 45%;
  right: 50%;
}

button {
  width: 14rem;
  text-transform: uppercase;
  font-family: verdana;
  height: 10rem;
  position: absolute;
  top: 62%;
  right: 44%;
  margin: 0 auto;
  border-radius: 25px;
  background-color: #a6d0dd;
  color: white;
  font-size: 35px;
  border: 2px solid #a6d0dd;
  cursor: pointer;
  outline: none;
  box-shadow: rgba(96, 104, 114, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  transition: 0.2s ease-in-out 0s;
}

button:hover {
  cursor: pointer;
  color: #a6d0dd;
  background-color: white;
}


/*==================== MEDIA QUERIES ====================*/

@media screen and (max-width: 428px) {

  .modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.modal {
  height: 48rem;
  width: 20rem;
  margin-top: 7%;
  padding: 10px;
  display: flex;
  align-content: center;
}

.modal p {
  position: absolute;
  margin: 5% auto 0;
}

.timer {
  font-size: 2em;
  font-weight: 500;
  top: 42%;
}

.score {
  font-size: 2em;
  font-weight: 500;
  top: 25%;
  right: 50%;
}
.result {
  font-size: 2em;
  font-weight: 300;
  top: 10%;
  right: 50%;
}

.message {
  font-size: 1.5em;
  font-weight: 200;
  top: 60%;
}

button {
  width: 7rem;
  height: 5rem;
  top: 75%;
  right: 35%;
  font-size: 20px;
}
 
}


/* For medium devices */
@media screen and (max-width: 900px){


.modal {
  height: 48rem;
  width: 40rem;
  margin-top: 7%;
  padding: 10px;
  display: flex;
  align-content: center;
}

.modal p {
  position: absolute;
  margin: 5% auto 0;
}

.timer {
  font-size: 2em;
  font-weight: 500;
  top: 27%;
}

.score {
  font-size: 2em;
  font-weight: 500;
  top: 20%;
  right: 50%;
}
.result {
  font-size: 2em;
  font-weight: 300;
  top: 10%;
  right: 50%;
}

.message {
  font-size: 1.5em;
  font-weight: 200;
  top: 40%;
}

button {
  width: 7rem;
  height: 5rem;
  top: 55%;
  right: 42%;
  font-size: 20px;
}
 
   
}
</style>