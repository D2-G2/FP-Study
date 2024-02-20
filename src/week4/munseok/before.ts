import _ from 'lodash';

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  text: string;
}

let posts = [
  { id: 1, title: '첫번째 글', content: '첫번째 글입니다.', comments: [{ id: 1, text: '안녕하세요!' }] },
  { id: 2, title: '두번째 글', content: '두번째 글입니다', comments: [] },
];

const newPost = { id: 3, title: '세번째 글', content: '세번째 글입니다', comments: [] };
const newComment = { id: 2, text: '댓글입니다!' };

/* 방어적 복사 */

function addPost(posts: Post[], newPost: Post) {
  let postsCopy = _.cloneDeep(posts);

  postsCopy.push(newPost);

  return postsCopy;
}

function addCommentToPost(posts: Post[], postId: number, comment: Comment) {
  let postsCopy = _.cloneDeep(posts);

  let post = postsCopy.find((p) => p.id === postId);
  if (post) {
    post.comments.push(comment);
    return postsCopy;
  }
}

function removePost(posts: Post[], id: number) {
  let postsCopy = _.cloneDeep(posts);

  let index = postsCopy.findIndex((post) => post.id === id);
  if (index !== -1) {
    postsCopy.splice(index, 1);
  }

  return postsCopy;
}

function removeCommentFromPost(posts: Post[], postId: number, commentId: number) {
  let postsCopy = _.cloneDeep(posts);

  let post = postsCopy.find((p) => p.id === postId);
  if (post) {
    let commentIndex = post.comments.findIndex((c) => c.id === commentId);
    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
    }
  }
  return postsCopy;
}

/* 카피 온 라이트 */

function updatePost(posts: Post[], postId: number, updateFields: Partial<Post>) {
  let postsCopy = _.clone(posts);

  let postIndex = postsCopy.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    postsCopy[postIndex] = { ...postsCopy[postIndex], ...updateFields };
  }
  return postsCopy;
}

posts = addPost(posts, newPost);
posts = addCommentToPost(posts, 1, newComment);
posts = removePost(posts, 2);
posts = removeCommentFromPost(posts, 1, 1);
posts = updatePost(posts, 1, { title: '첫번째 글 수정하기' });
