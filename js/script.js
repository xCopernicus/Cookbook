'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optActiveLinks = 'a.active[href^="#author-"], a.active[href^="#tag-"]',
  articleList = document.querySelectorAll(optArticleSelector);



function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');
  console.log('clickedElement:', clickedElement);
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(const activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
  for(const activeArticle of activeArticles){
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


function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log('Title list: ', titleList);

  let html = '';

  const articleListDisplay = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articleListDisplay);

  /* [DONE] for each article */


  for(const article of articleListDisplay){
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

    const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.insertAdjacentHTML('beforeend', html);
  //dlaczego to nie jest w loopie

  const links = document.querySelectorAll('.titles a');
  const arrayFromLinks = Array.from(links);
  console.log(links);
  console.log(arrayFromLinks);

  for(const link of links){
    link.addEventListener('click', titleClickHandler);
  }
}


function generateTags(){
  /* [DONE] find all articles */



  /* [DONE] START LOOP: for every article: */

  for (const article of articleList){

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

    for (const articleTag of articleTagsArray){
      console.log('Tag: ', articleTag);

      /* [DONE] generate HTML of the link */

      const articleTagHTML = '<li><a href="#tag-' + articleTag + '">' + articleTag + '</a></li>';
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


function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('Href: ', href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('Tag: ', tag);

  /* find all tag links with class active */

  const tagLinksActive = document.querySelectorAll(optActiveLinks);
  console.log('Tag Links Active: ', tagLinksActive);

  /* START LOOP: for each active tag link */

  for (const tagLinkActive of tagLinksActive){

    /* remove class active */

    tagLinkActive.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Same Tag Linsk: ', sameTagLinks);

  /* START LOOP: for each found tag link */

  for (const sameTagLink of sameTagLinks){

    /* add class active */

    sameTagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~=' + tag + ']');

}


function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Tag links: ', tagLinks);

  /* START LOOP: for each link */

  for (const tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}


function generateAuthors(){

  for(const article of articleList){

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    const author = article.getAttribute('data-author');
    console.log('Author: ', author);

    authorWrapper.innerHTML = 'by <a href="#author-' + author + '">' + author + '</a>';

  }
}


function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const author = href.replace('#author-', '');

  const authorLinksActive = document.querySelectorAll(optActiveLinks);

  for (const authorLinkActive of authorLinksActive){
    authorLinkActive.classList.remove('active');
  }

  const sameAuthorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

  for (const sameAuthorLink of sameAuthorLinks){
    sameAuthorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors(){

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (const authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}


generateTitleLinks();

generateTags();
addClickListenersToTags();

generateAuthors();
addClickListenersToAuthors();

const firstArticle = document.querySelector('.titles a');
firstArticle.classList.add('active');
