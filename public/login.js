const loginFormDOM = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');

loginFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!emailInput.value || !passwordInput.value) return;
  const email = emailInput.value;
  const senha = passwordInput.value;
  const user = { email, senha };
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.status === 200) {
      emailInput.value = '';
      passwordInput.value = '';
    }
  } catch (error) {
    console.log(error);
  }
});