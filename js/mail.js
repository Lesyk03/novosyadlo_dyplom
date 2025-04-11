
    (function(){
        emailjs.init("Yeoal-73PSvd8D5EP"); // заміни на свій
      })();
    
      function sendEmail() {
        let number = window.prompt('Введіть номер телефону (до 12 символів)');
    
        if (!number) return; // якщо нічого не ввели — вихід
    
        if (number.length > 13) {
          alert("Номер занадто довгий. Максимум 13 символів.");
          return;
        }
    
        emailjs.send("service_b40t8be", "template_ziy7q4w", {
          user_number: number
        })
        .then(function(response) {
           alert("Заявку надіслано! 👍");
        }, function(error) {
           alert("Помилка 😥: " + error);
        });
      }