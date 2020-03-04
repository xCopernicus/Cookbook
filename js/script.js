'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  articleList = document.querySelectorAll(optArticleSelector);

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');
  console.log('clickedElement:', clickedElement);
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(titleList);

  let html = '';

  /* [DONE] for each article */


  for(let article of articleList){
    console.log(article);

    /* [DONE] get the article id */

    const articleID = article.getAttribute('id');
    console.log(articleID);

    /* [DONE] find the title element */

    const articleTitleElement = article.querySelector(optTitleSelector);
    console.log(articleTitleElement);

    /* [DONE] get the title from the title element */

    const articleTitle = articleTitleElement.innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */

    let linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.insertAdjacentHTML('beforeend', html);
  //dlaczego to nie jest w loopie

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const firstLink = document.querySelector('.titles a');
  console.log('The first link is: ', firstLink);
  firstLink.classList.add('active');
}


function generateTags(){
  /* [DONE] find all articles */

  /* [DONE] START LOOP: for every article: */

  for (let article of articleList){
    console.log('Article: ', article)

    /* [DONE] find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('Tag Wrapper: ', tagWrapper);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('Article tags: ', articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('Article tags array: ', articleTagsArray);

    /* [DONE] START LOOP: for each tag */

    for (let articleTag of articleTagsArray){
      console.log('Tag: ', articleTag);

      /* [DONE] generate HTML of the link */

      let articleTagHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
      console.log(articleTagHTML);

      /* [DONE] add generated code to html variable */

      html = html + articleTagHTML;

    /* [DONE] END LOOP: for each tag */

    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagWrapper.insertAdjacentHTML('beforeend', html);

  /* [DONE] END LOOP: for every article: */

  }
}

generateTitleLinks();
generateTags();
