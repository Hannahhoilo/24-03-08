import firebaseConfig from "./firebaseConfig";

import {initializeApp} from "firebase/app";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";

initializeApp(firebaseConfig);
const authService = getAuth();


// DOM ELEMENTS

const emailInput = document.querySelector('.email');
const passwordInput = document.querySelector('.password');
const signInButton = document.querySelector('.sign-in-button');
const signOutButton = document.querySelector('.sign-out-button');
const signUpButton = document.querySelector('.sign-up-button');
const errorMessage = document.querySelector('.error-message');

const frontPage = document.querySelector('.front-page');
const secretSection = document.querySelector('.secret-section');


signUpButton.addEventListener('click', (e) => {
	e.preventDefault();
	createUserWithEmailAndPassword(authService, emailInput.value, passwordInput.value)
	.then(()=>{
		checkAuthStateAndRender();
	})
	.catch((error) => {
		errorMessage.computedStyleMap.display = 'block';
		errorMessage.textContent = error.message;
	})
})

signInButton.addEventListener('click', (e) => {
	e.preventDefault();
	signInWithEmailAndPassword(authService, emailInput.value, passwordInput.value)
	.then(() => {
		checkAuthStateAndRender();
	})
	.catch((error) => {
		errorMessage.computedStyleMap.display = 'block';
		errorMessage.textContent = error.message;
	})
})

signOutButton.addEventListener('click', (e) => {
	e.preventDefault();
	signOut(authService)
	.then(() => {
		checkAuthStateAndRender();
		console.log("Signed out!");
	})
	.catch((error) => {
		console.log(error.message);
	})
});

function checkAuthStateAndRender() {
	onAuthStateChanged(authService, (user)=> {
		if(user) {
			errorMessage.textContent = '';
			frontPage.style.display = 'none';
			secretSection.style.display = 'block';
			signOutButton.style.display = 'block';
		} else {
			frontPage.style.display = 'flex';
			secretSection.style.display = 'none';
			signOutButton.style.display = 'none';
		}
	});
};

checkAuthStateAndRender();