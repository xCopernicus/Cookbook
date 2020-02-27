'use strict';

const links = document.querySelectorAll('.titles a');

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
    var hrefAttribute = clickedElement.getAttribute('href')
    console.log(hrefAttribute)
  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
