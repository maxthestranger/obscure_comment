import { userData, sampleComments } from './userData.js';

const form = document.querySelector('#form');
const commentCon = document.querySelector('.comments');
const userBtn = document.querySelector('#user');
const upvoteBtn = document.querySelectorAll('.upvoteBtn');
const replyBtn = document.querySelectorAll('.reply');

const getUser = (users) => {
  return users[Math.floor(Math.random() * users.length)];
};

const renderCurrentUser = (user) => {
  document.querySelector('.user_name').innerText = user.full_name;
  const img = document.querySelectorAll('.user_avatar');

  Array.from(img).forEach((e) => {
    e.setAttribute('src', `assets/img/${user.imgUrl}`);
  });
};

const displayComment = (comment, currentUser) => {
  const div = document.createElement('div');
  div.classList.add('comment');

  div.innerHTML = `
    <div class="avatar">
      <img src="assets/img/${currentUser.imgUrl}" alt="${currentUser.full_name}" />
    </div>
    <div class="comment_details" data-id="${comment.commentId}">
      <p class="name_time"><span>${currentUser.full_name}</span>${comment?.createdAt}</p>
      <p class="description">
        ${comment?.description}
      </p>
      <div class="upvote_reply">
        <button type="button" class="upvoteBtn">
          <i class="bi bi-caret-up-fill"></i> Upvote <span>${comment?.upvote}</span>
        </button>
        <button type="button" id="reply">Reply</button>
      </div>
    </div>`;

  commentCon.prepend(div);
};

const renderComments = () => {
  sampleComments?.forEach((comment) => {
    const user = userData.filter((user) => user.id === comment.userId);
    displayComment(comment, user[0]);
  });

  if (sampleComments.length < 1) {
    commentCon.innerHTML = `
      <div class="empty">
        <i class="bi bi-chat-left-quote"></i>
        <p>Mmh! Seems pretty quite in here!</p>
      </div>
    `;
  }
};

const handleSubmit = (e, currentUser) => {
  e.preventDefault();
  const { comment } = e.target.elements;

  const commentObj = {
    userId: currentUser.id,
    commentId: sampleComments[sampleComments.length - 1] + 1,
    description: comment.value,
    createdAt: 'Just now',
    upvote: 0,
    reply: [],
  };

  // validation
  if (comment.value.trim() !== '') {
    displayComment(commentObj, currentUser);
    comment.value = '';
  }
};

window.addEventListener('load', () => {
  renderComments();
  // render current user
  let currentUser = getUser(userData);
  renderCurrentUser(currentUser);

  // change user
  userBtn.addEventListener('click', () => {
    currentUser = getUser(userData);

    renderCurrentUser(currentUser);
  });

  commentCon.addEventListener('click', (e) => {
    if (e.target.className === 'upvoteBtn') {
      const parent = e.target.parentNode.parentNode;
      const commentId = parent.dataset.id;

      sampleComments.forEach((comment) => {
        if (comment.commentId === Number(commentId)) {
          comment.upvote++;
        }
      });

      Array.from(e.target.children).forEach((child) => {
        if (child.localName === 'span') {
          const val = child.innerHTML;
          child.innerHTML = Number(val) + 1;
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    handleSubmit(e, currentUser);
  });
});
