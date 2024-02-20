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

/* 레이어 1 :  비즈니스 로직 계층 */
function commentAndNotify(posts: Post[], postId: number, newComment: Comment, userId: number): Post[] {
  const updatedPosts = attachComment(posts, postId, newComment);

  const notificationMessage = `${userId}가 ${postId} 글에 댓글을 남겼습니다.`;

  notify(notificationMessage);

  return updatedPosts;
}

/* 레이어 2 : 기능 함수 */
const addPost = (posts: Post[], newPost: Post) => addEntity(posts, newPost);

const attachComment = (posts: Post[], postId: number, newComment: Comment) =>
  updateEntity(posts, postId, (post) => ({ ...post, comments: addEntity(post.commments, newComment) }));

const removePost = (posts: Post[], id: number) => removeEntity(posts, id);

const detachComment = (posts: Post[], postId: number, commentId: number) =>
  updateEntity(posts, postId, (post) => ({ ...post, comments: removeEntity(post.comments, commentId) }));

const editPost = (posts: Post[], postId: number, updateFields: Partial<Post>) =>
  updateEntity(posts, postId, (post) => ({ ...post, ...updateFields }));

function notify(notificationMessage: string) {
  alert(notificationMessage);
}

/* 레이어 3 : 기본 데이터 조작 함수 */
const addEntity = (entities, newEntity) => [...entities, newEntity];
const updateEntity = (entities, entityId, updateCallback) =>
  entities.map((entity) => (entity.id === entityId ? updateCallback(entity) : entity));
const removeEntity = (entities, entityId) => entities.filter((entity) => entity.id !== entityId);

/* 데이터 */
const newPost = { id: 3, title: '세번째 글', content: '세번째 글입니다', comments: [] };
const newComment = { id: 2, text: '댓글입니다!' };
