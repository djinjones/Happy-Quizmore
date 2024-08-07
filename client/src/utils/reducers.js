// this code is incomplete, i started making it because we will probably need a reducer for submitting the answer to the quiz

import { SUBMIT_ANSWER, SHOW_ANSWER } from "./actions";

export const reducer = (state, action) => {
    let answer = [action.answer];
    const apiUrl = `http//:localhost/3000/api/${answer}`

    switch (action.type) {
        case SUBMIT_ANSWER:
            return {
                ...state,
                answer: [action.answer],
            };

        case SHOW_ANSWER:

            async function getAnswer() {
                try {
                    const correctAnswer = await fetch(apiUrl)
                } catch (error) {
                    console.error(error);
                }
            }

            return {
                ...state,

            }
    }
}