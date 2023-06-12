<template>
  <!-- HOME PAGE  -->
  <div class="Home-container">
    <!-- Welcome Message -->
    <h1>Welcome to the quiz!</h1>
    <!-- Redirection to Quiz Page -->
    <router-link to="/QuizPage"><button>Start</button></router-link>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>
<style scoped>
.Home-container {
  width: 50rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  border-radius: 35px;
  align-items: center;
  justify-content: space-around;
  margin: 8% auto 0;
}

.Home-container h1 {
  position: absolute;
  top: 20%;
  right: 50%;
  transform: translate(50%, -50%);
  margin: 5% auto 0;
  text-transform: uppercase;
  font-family: verdana;
  font-size: 7em;
  font-weight: 700;
  color: #ff6969;
  text-shadow: 1px 1px 1px #919191, 1px 2px 1px #919191, 1px 3px 1px #919191,
    1px 4px 1px #919191, 1px 5px 1px #919191, 1px 6px 1px #919191,
    1px 7px 1px #919191, 1px 8px 1px #919191, 1px 9px 1px #919191,
    1px 10px 1px #919191, 1px 18px 6px rgba(16, 16, 16, 0.4),
    1px 22px 10px rgba(16, 16, 16, 0.5), 1px 25px 35px rgba(16, 16, 16, 0),
    1px 30px 60px rgba(16, 16, 16, 0);
}

button {
  width: 14rem;
  text-transform: uppercase;
  font-family: verdana;
  height: 10rem;
  position: absolute;
  top: 50%;
  right: 45%;
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
/* For small devices */
@media screen and (max-width: 350px) {
  .container {
    margin-left: var(--mb-1);
    margin-right: var(--mb-1);
  }
}

/* For small devices (iphones) */
@media screen and (max-width: 428px) {
  .Home-container {
    width: 20rem;
    height: 30rem;
    margin: 2% auto 0;
  }

  .Home-container h1 {
    top: 35%;
    right: 50%;
    font-size: 4em;
    font-weight: 500;
  }

  button {
    width: 8rem;
    height: 5rem;
    top: 60%;
    right: 32%;
  }
}

/* For medium devices */
@media screen and (min-width: 568px) {
  .Home-container {
    width: 20rem;
    height: 30rem;
    margin: 2% auto 0;
  }

  .Home-container h1 {
    top: 35%;
    right: 50%;
    font-size: 7em;
    font-weight: 700;
  }

  button {
    width: 8rem;
    height: 5rem;
    top: 70%;
    right: 40%;
  }
}

@media screen and (min-width: 768px) {
  .Home-container {
    width: 20rem;
    height: 30rem;
    margin: 2% auto 0;
  }

  .Home-container h1 {
    top: 35%;
    right: 50%;
    font-size: 7em;
    font-weight: 700;
  }

  button {
    width: 8rem;
    height: 5rem;
    top: 70%;
    right: 40%;
  }
}
</style>