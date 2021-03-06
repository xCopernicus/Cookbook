'use strict';

const opts = {
  tagSizes: {
    count: 4,
    classPrefix: 'tag-size-',
  },
};

const select = {
  all: {
    articles: '.post',
    articlesActive: '.post.active',
    linksTo: {
      titles: '.titles a',
      titlesActive: '.titles a.active',
      tagsAndAuthors: 'a.active[href^="#author-"], a.active[href^="#tag-"]',
    },
  },
  article: {
    tags: '.post-tags .list',
    author: '.post-author',
    title: '.post-title',
    articleForAuthor: function(author) {
      return `article[data-author="${author}"]`;
    },
    articleForTag: function(articleTag) {
      return `article[data-tags~="${articleTag}"]`;
    }
  },
  listOf: {
    titles: '.titles',
    tags: '.list.tags',
    authors: '.list.authors',
  },
};

const objs = {
  articleList: document.querySelectorAll(select.all.articles)
};

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagLinkList: Handlebars.compile(document.querySelector('#template-tag-link-list').innerHTML),
  authorLinkList: Handlebars.compile(document.querySelector('#template-author-link-list').innerHTML)
};


function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked');
  console.log('clickedElement:', clickedElement);
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(select.all.linksTo.titlesActive);
  for(const activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(select.all.articlesActive);
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

  const titleList = document.querySelector(select.listOf.titles);
  titleList.innerHTML = '';
  console.log('Title list: ', titleList);

  let html = '';

  const articleListDisplay = document.querySelectorAll(select.all.articles + customSelector);
  console.log(articleListDisplay);

  /* [DONE] for each article */


  for(const article of articleListDisplay){
    console.log(article);

    /* [DONE] get the article id */

    const articleID = article.getAttribute('id');
    console.log(articleID);

    /* [DONE] find the title element */

    const articleTitleElement = article.querySelector(select.article.title);
    console.log(articleTitleElement);

    /* [DONE] get the title from the title element */

    const articleTitle = articleTitleElement.innerHTML;
    console.log(articleTitle);

    /* [DONE] create HTML of the link */

    const linkHTMLData = {id: articleID, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.insertAdjacentHTML('beforeend', html);
  //dlaczego to nie jest w loopie

  const links = document.querySelectorAll(select.all.linksTo.titles);
  const arrayFromLinks = Array.from(links);
  console.log(links);
  console.log(arrayFromLinks);

  for(const link of links){
    link.addEventListener('click', titleClickHandler);
  }
}


function calculateTagsParams(tags){

  /*let tagsParams = {'max': 0, 'min': 999999};

  for(const tag in tags){
    tagsParams.max = Math.max(tags[tag], tagsParams.max);
    tagsParams.min = Math.min(tags[tag], tagsParams.min);
  }

  return tagsParams;*/

  let tagsParams = [0, 999999];

  for(const tag in tags){
    tagsParams[0] = Math.max(tags[tag], tagsParams[0]);
    tagsParams[1] = Math.min(tags[tag], tagsParams[1]);
  }

  return tagsParams;

}


function calculateTagClass(counts, params){

  const classNumber = Math.floor(((counts - params[1]) / (params[0] - params[1])) * opts.tagSizes.count + 1);

  /* const range = (params[0] - params[1])/5;
  let classNumber = 3;

  if (counts < range) {
    classNumber = 1;
  } else if (counts < 2 * range) {
    classNumber = 2;
  } else if (counts < 3 * range) {
    classNumber = 3;
  } else if (counts < 4 * range) {
    classNumber = 4;
  } else if (counts < 5 * range) {
    classNumber = 5;
  }*/

  return opts.tagSizes.classPrefix + classNumber;
}


function generateTags(){

  let allTags = {};

  /* [DONE] START LOOP: for every article: */

  for (const article of objs.articleList){

    /* [DONE] find tags wrapper */

    const tagWrapper = article.querySelector(select.article.tags);
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

      const articleTagHTMLData = {articleTag: articleTag};
      const articleTagHTML = templates.tagLink(articleTagHTMLData);

      console.log(articleTagHTML);

      /* [DONE] add generated code to html variable */

      html = html + articleTagHTML;

      const tagArticleLenght = document.querySelectorAll(select.article.articleForTag(articleTag)).length;
      allTags[articleTag] = tagArticleLenght;

      console.log('All tags: ', allTags);

      /* [DONE] END LOOP: for each tag */

    }

    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagWrapper.insertAdjacentHTML('beforeend', html);

    /* [DONE] END LOOP: for every article: */

  }

  const tagList = document.querySelector(select.listOf.tags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('Tags params: ', tagsParams);

  const allTagsData = {tags: []};

  for (const tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      numebr: allTags[tag],
      tagClass: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  console.log('All Tags Data: ', allTagsData);

  tagList.innerHTML = templates.tagLinkList(allTagsData);
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

  const linksActive = document.querySelectorAll(select.all.linksTo.tagsAndAuthors);
  console.log('Tag Links Active: ', linksActive);

  /* START LOOP: for each active tag link */

  for (const linkActive of linksActive){

    /* remove class active */

    linkActive.classList.remove('active');

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

  const allAuthors = {};

  for(const article of objs.articleList){

    const authorWrapper = article.querySelector(select.article.author);

    const author = article.getAttribute('data-author');
    console.log('Author: ', author);

    const authorArticlesLength = document.querySelectorAll(select.article.articleForAuthor(author)).length;
    allAuthors[author] = authorArticlesLength;

    console.log('All Authors: ', allAuthors);

    const authorHTMLData = {author: author};
    authorWrapper.innerHTML = templates.authorLink(authorHTMLData);

  }


  const authorList = document.querySelector(select.listOf.authors);

  let allAuthorsData = {tags: []};

  for (const author in allAuthors){
    allAuthorsData.tags.push({
      author: author,
      number: allAuthors[author]
    });
  }
  authorList.innerHTML = templates.authorLinkList(allAuthorsData);
}


function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  console.log(href);

  const author = href.replace('#author-', '');

  const linksActive = document.querySelectorAll(select.all.linksTo.tagsAndAuthors);

  for (const linkActive of linksActive){
    linkActive.classList.remove('active');
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

const firstArticle = document.querySelector(select.all.linksTo.titles);
firstArticle.classList.add('active');
