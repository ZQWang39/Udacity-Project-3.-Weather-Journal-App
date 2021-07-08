import {performAction} from './js/app'

import './styles/style.scss'

//function called by event listener 
document.getElementById('generate').addEventListener('click',performAction);


export {performAction};