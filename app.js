// Пример для обработки формы генерации текста
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.querySelector('textarea').value;

  // Пример запроса на сервер или к API
  fetch('/generate-text', {
    method: 'POST',
    body: JSON.stringify({ query: query }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Error:', error));
});
