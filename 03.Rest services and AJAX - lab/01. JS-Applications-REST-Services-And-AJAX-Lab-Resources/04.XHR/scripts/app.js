function loadRepos() {
   const divRes = document.querySelector('#res');
   const url = 'https://api.github.com/users/testnakov/repos';
   const xmlHttpRequest = new XMLHttpRequest();
   xmlHttpRequest.addEventListener('readystatechange', function(){
      if(xmlHttpRequest.readyState ==4 && xmlHttpRequest.status ==200 ){
         divRes.textContent = xmlHttpRequest.responseText;
      }
   });
   xmlHttpRequest.open('GET', url);
   xmlHttpRequest.send();
}