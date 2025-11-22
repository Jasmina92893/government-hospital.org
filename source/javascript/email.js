// Инициализация EmailJS
(function(){
  emailjs.init("xyb6lilxM0yrKY3XF"); // Твой Public Key
})();

function sendEmail(event) {
  event.preventDefault();

  // Данные из формы
  const params = {
    fio: document.getElementById('fio').value,
    email: document.getElementById('email').value, // email клиента
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    analysis: document.getElementById('analysis').value,
    doctor: document.getElementById('doctor').value,
    message: document.getElementById('message').value
  };

  // 1️⃣ Отправка на твой email
  emailjs.send("service_8slof5r", "template_22ouxst", params)
    .then(function(response) {
      // 2️⃣ Отправка копии клиенту
      sendCopyToClient(params.email, params);
    }, function(error) {
      showModal("Ошибка отправки! Попробуйте ещё раз.");
      console.error(error);
    });
}

// Функция для отправки копии клиенту
function sendCopyToClient(clientEmail, params) {
  const copyParams = {...params}; // создаём копию параметров
  copyParams.email = clientEmail; // устанавливаем To Email = email клиента

  emailjs.send("service_8slof5r", "template_22ouxst", copyParams)
    .then(function() {
      showModal("Заявка успешно отправлена! Результаты пришли на Email.");
      document.querySelector('form').reset(); // очищаем форму
    }, function(error) {
      showModal("Ошибка при отправке копии клиенту!");
      console.error(error);
    });
}

// Функция для модального уведомления
function showModal(message) {
  let modal = document.getElementById("success-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "success-modal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>${message}</p>
      </div>`;
    document.body.appendChild(modal);
  } else {
    modal.querySelector("p").textContent = message;
  }

  modal.style.display = "block";

  const span = modal.querySelector(".close");
  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
