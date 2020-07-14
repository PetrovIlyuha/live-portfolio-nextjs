import { fromNow } from '../../utils/functions';
import { ArcherContainer, ArcherElement } from 'react-archer';

const PostItem = ({ post, className = '', onReply, canCreate = false }) => {
  const {
    content,
    createdAt,
    user: { username, avatar },
    parent,
  } = post;
  return (
    <div className={`topic-post ${className}`}>
      <article>
        <div className="row">
          <div className="topic-avatar">
            <div className="main-avatar">
              <img className="avatar subtle-shadow" src={avatar}></img>
            </div>
          </div>
          <div className="topic-body">
            <div className="topic-header">
              <div className="topic-meta">
                <div className="name-container">
                  <span className="name">{username}</span>
                </div>
                <div className="date-container">
                  <span className="date">
                    {createdAt && fromNow(createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="topic-content">
              <ArcherContainer strokeColor="red">
                {parent && parent !== null && (
                  <div className="topic-parent cooked">
                    <div className="topic-parent-inner cooked">
                      <div className="topic-parent-header">
                        <div className="topic-parent-avatar">
                          <div className="main-avatar">
                            <img
                              className="avatar subtle-shadow"
                              src={parent.user.avatar}
                            ></img>
                          </div>
                        </div>
                        <div className="username">{parent.user.username}</div>
                      </div>
                      <div className="topic-parent-content">
                        <ArcherElement id="parent">
                          <p>{parent.content}</p>
                        </ArcherElement>
                      </div>
                    </div>
                  </div>
                )}
                {parent ? (
                  <ArcherElement
                    id="reply"
                    relations={[
                      {
                        targetId: 'parent',
                        targetAnchor: 'left',
                        sourceAnchor: 'top',
                        style: {
                          strokeColor: 'rgba(250,250,250,0.6)',
                          strokeWidth: 3,
                        },
                      },
                    ]}
                  >
                    <p style={{ paddingLeft: 10, width: 200 }}>{content}</p>
                  </ArcherElement>
                ) : (
                  <div className="cooked">
                    <p
                      style={{
                        marginLeft: 140,
                        paddingLeft: 10,
                      }}
                    >
                      {content}
                    </p>
                  </div>
                )}
              </ArcherContainer>
              <section className="post-menu-area">
                <nav className="post-controls">
                  <div className="actions">
                    {onReply && (
                      <button
                        disabled={!canCreate}
                        className="btn btn-primary"
                        onClick={() => onReply({ ...post })}
                      >
                        Reply
                      </button>
                    )}
                  </div>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
