import {createRouter, createWebHistory} from 'vue-router'
import HomePage from '../components/HomePage'
import QuizPage from '../components/QuizPage'

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/QuizPage',
        component: QuizPage,
    }
]
const router = createRouter({
       history: createWebHistory(),
       routes
   })
    
    export default router;