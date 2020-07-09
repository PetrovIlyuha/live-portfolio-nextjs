import React, { useState } from 'react';

const Replier = ({ isOpen, onClose, onSubmit, replyTo }) => {
  const [reply, setReply] = useState({
    title: '',
    content: '',
  });

  const handleReplyInputsChange = e => {
    const { name, value } = e.target;
    setReply({ ...reply, [name]: value });
  };

  const resetFormFields = () => {
    setReply({ title: '', content: '' });
  };
  return (
    <div className={`reply-controls ${isOpen ? 'is-open' : ''}`}>
      <div className="reply-area">
        {replyTo && (
          <div className="reply-to">
            Reply To: <span className="text ml-2">User1</span>
          </div>
        )}
        <div className="fj-editor-input">
          <input
            onChange={handleReplyInputsChange}
            value={reply.title}
            name="title"
            placeholder="Topic title"
            type="text"
          ></input>
        </div>
        <div className="fj-editor">
          <div className="fj-editor-textarea-wrapper">
            <textarea
              onChange={handleReplyInputsChange}
              value={reply.content}
              name="content"
              placeholder="Type here"
            ></textarea>
          </div>
          <div className="fj-editor-preview-wrapper">
            <div className="preview">
              <p></p>
            </div>
          </div>
        </div>
        <div className="submit-area">
          <div className="send mr-auto">
            <button
              onClick={() => {
                onSubmit(reply, resetFormFields);
              }}
              className="btn btn-primary py-2 ttu"
            >
              Reply
            </button>
            <a className="btn py-2 ttu gray-10" onClick={onClose}>
              Cancel
            </a>
          </div>
          <div>
            <a className="btn py-2 ttu gray-10">hide preview</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replier;
