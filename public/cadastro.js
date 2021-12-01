const loginFormDOM = document.querySelector('.form');
const emailInput = document.querySelector('.email-input');
const passwordInput = document.querySelector('.password-input');
const nameInput = document.querySelector('.name-input');

loginFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!emailInput.value || !passwordInput.value || !nameInput.value) return;
  const email = emailInput.value;
  const senha = passwordInput.value;
  const nome = nameInput.value;
  const user = { email, senha, nome };
  try {
    const response = await fetch('/api/auth/cadastro', {
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