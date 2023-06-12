<template>
<!-- Quiz Page -->
  <h1 id="quiz-title">quiz</h1>
  <!-- QUIZ CONTAINER  -->
  <section class="Quiz-container">
    <!-- Quiz Question Container -->
    <div class="Quiz-question-container">
      <h1 id="display-question">
        {{ questionCounter }}. {{ formattedQuestion }}
      </h1>
    </div>

    <!-- OPTIONS CONTAINER  -->
    <div class="Quiz-options-container">
      <div
        v-for="(choice, item) in formattedOptions"
        :key="item"
        :ref="optionChosen"
        @click="onOptionClicked(choice, item)"
      >
        <span>
          <input type="radio" :id="item" name="item" :value="choice" />
          <label for="item" class="option">{{ choice }}</label>
        </span>
      </div>
    </div>
  </section>
  <!-- Modal components to show stats -->
  <ModalPage v-if="showModal" :result="result" :score="score" :timer="timer">
  </ModalPage>
</template>

<script>
import { ref, onMounted } from "vue";
import ModalPage from "@/components/ModalPage.vue";
export default {

  computed: {
    formattedQuestion() {
        return this.currentQuestion.question.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, " ").replace(/&#47;/g, "/")
        .replace(/&#x2F;/g, "/").replace(/x27;/g, "'").replace(/&#39;/g, "'");
    },
    formattedOptions() {
     return this.currentQuestion.choices.map(choice => choice.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, " ").replace(/&#47;/g, "/")
        .replace(/&#x2F;/g, "/").replace(/x27;/g, "'").replace(/&#39;/g, "'"));
    }

  },
  components: { ModalPage },
  setup() {
    let showModal = ref(false);
    let canClick = true;
    let timer = ref("00:00:00");
    let result = ref("");
    let timeBegan = null;
    let timeStopped = null,
      stoppedDuration = 0,
      started = null,
      running = false;
    let questionCounter = ref(0);
    let score = ref(0);
    const currentQuestion = ref({
      question: "",
      answer: 1,
      choices: [],
    });

    const questions = [];
    const clockRunning = () => {
      var currentTime = new Date(),
        timeElapsed = new Date(currentTime - timeBegan - stoppedDuration),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds();

      timer.value =
        zeroPrefix(hour, 2) +
        " Hrs " +
        zeroPrefix(min, 2) +
        " Min " +
        zeroPrefix(sec, 2) +
        " Sec ";
    };

    const zeroPrefix = (num, digit) => {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    };

    const fetchQuestions = async function () {
      fetch(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const Newquestions = data.results.map((ServerQuestion) => {
            const arrangedQuestion = {
              question: ServerQuestion.question,
              choices: "",
              answer: "",
            };

            const choices = ServerQuestion.incorrect_answers;

            arrangedQuestion.answer = Math.floor(Math.random() * 4 + 1);

            choices.splice(
              arrangedQuestion.answer - 1,
              0,
              ServerQuestion.correct_answer
            );
            arrangedQuestion.choices = choices;

            return arrangedQuestion;
          });
          questions.value = Newquestions;
          loadQuestion();
        });
    };
    const loadQuestion = () => {
      canClick = true;
      if (questions.value.length > questionCounter.value) {
        currentQuestion.value = questions.value[questionCounter.value];
        questionCounter.value++;

        //timer
        if (running) return;

        if (timeBegan === null) {
          timeBegan = new Date();
        }

        if (timeStopped !== null) {
          stoppedDuration += new Date() - timeStopped;
        }

        started = setInterval(clockRunning, 10);
        running = true;
      } else {
        running = false;
        timeStopped = new Date();
        clearInterval(started);
        if (score.value >= 5) {
          result.value = "Congratulations";
        } else {
          result.value = "Bad luck";
        }
        showModal.value = true;
      }

    };
    let intemRef = [];
    const optionChosen = (element) => {
      if (element) {
        intemRef.push(element);
      }
    };

    const clearSelected = (divSelected) => {
      setTimeout(() => {
        divSelected.classList.remove("option-correct");
        divSelected.classList.remove("option-wrong");
        divSelected.classList.add("option-default");
        loadQuestion();
      }, 1000);
    };
    const onOptionClicked = (choice, item) => {
      if (canClick) {
        const divContainer = intemRef[item];
        const optionID = item + 1;
        if (currentQuestion.value.answer == optionID) {
          score.value++;
          divContainer.classList.add("option-correct");
          divContainer.classList.remove("option-default");
        } else {
          divContainer.classList.remove("option-correct");
          divContainer.classList.add("option-wrong");
        }
        canClick = false;
        clearSelected(divContainer);
      } else {
        console.log("can't select question anymore");
      }
    };

    onMounted(() => {
      fetchQuestions();
    });
    return {
      questionCounter,
      currentQuestion,
      questions,
      score,
      timer,
      result,
      showModal,
      loadQuestion,
      onOptionClicked,
      optionChosen,
    };
  },
  /*  mounted: function () {
    //Category: Science : Computers/ Difficulty: Mediem
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
      )
      .then((response) => {
        console.log(response);
        this.questions = response.data.results;
      });
  }, */
};
</script>
<style scoped>
.Quiz-container {
  width: 40rem;
  height: 40rem;
  color: #11416e;
  background-color: #fff9de;
  display: flex;
  border-radius: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 8% auto 0;
  box-shadow: rgba(101, 111, 122, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.Quiz-question-container {
  width: 80%;
  height: 12rem;
  margin: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ff6969;
  border-radius: 25px;
  padding: 5px;
  background-color: #ff6969;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.Quiz-question-container h1 {
  font-size: 1.2rem;
  text-align: center;
  color: white;
}

.Quiz-options-container {
  width: 80%;
  height: 15rem;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  color: #11416e;
}

.Quiz-options-container div {
  border: 2px solid #ff6969;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 25px;
  width: 45%;
  height: 3rem;
  overflow: hidden;
  transition: 0.2s ease-in-out 0s;
}

.Quiz-options-container div:hover {
  cursor: pointer;
  transform: scale(1.1);
}

input[type="radio"] {
  position: relative;
  display: none;
}

span label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s;
  font-weight: 600;
}

.option-correct {
  background-color: green;
}

.option-wrong {
  background-color: red;
}

#quiz-title {
  position: absolute;
  top: 2%;
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




/*==================== MEDIA QUERIES ====================*/

@media screen and (max-width: 428px) {
 .Quiz-container {
  width: 20rem;
  height: 35rem;
  margin-top: 5%;
}

.Quiz-question-container {
  width: 70%;
  height: 12rem;
  margin: 5%;
}

.Quiz-options-container {
  width: 80%;
  height: 17rem;
  display: inline-block;
}

.Quiz-options-container div {
  width: 100%;
  height: 3rem;
  margin: 5% auto 0;
}

#quiz-title {
  position: absolute;
  top: 2%;
  right: 50%;
  margin: 5% auto 0;
  font-size: 5em;
  font-weight: 500;
}
}
</style>
