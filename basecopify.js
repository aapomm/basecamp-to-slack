console.log('basecopify loaded!');

document.querySelectorAll('[data-behavior~=todo]').forEach(function(el){
  child = document.createElement('span');
  child.className = 'basecopify-link'
  child.setAttribute('data-behavior', 'basecopify-link');

  link = document.createElement('a');
  link.href = '#';
  link.textContent = 'Copy for Slack';

  child.appendChild(link);
  el.appendChild(child);

  el.addEventListener('mouseenter', function(event){
    link = event.target.querySelector('[data-behavior~=basecopify-link]');
    link.style.display = 'inline';
  });

  el.addEventListener('mouseleave', function(event){
    link = event.target.querySelector('[data-behavior~=basecopify-link]');
    link.style.display = 'none';
  });
});

document.querySelectorAll('[data-behavior~=basecopify-link]').forEach(function(link){
  link.addEventListener('click', function(event){
    event.preventDefault();

    link = event.target;

    todo = link.closest('[data-behavior~=todo]');
    url = "https://3.basecamp.com" + todo.getAttribute('data-url');
    text = todo.querySelector('.checkbox').querySelector('a').textContent.trim();

    msg = "[" + text + "](" + url + ")";

    navigator.clipboard.writeText(msg).then(() => {
      link.textContent = 'Copied to Clipboard!';

      setTimeout(function() {
        link.textContent = 'Copy for Slack';
      }, 1000);
    },() => {
      console.error('Failed to copy');
    });
  });
});