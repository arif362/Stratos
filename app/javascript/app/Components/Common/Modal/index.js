import React from "react";

const Modal = ({buttonStyle, title, content, submit, children}) => {
  const [showModal, setShowModal] = React.useState(false);

  const submitAndClose = (submit) => {
    submit(); 
    setShowModal(false)
  }

  return (
    <>
      <button
        className={buttonStyle}
        type="button"
        onClick={() => setShowModal(true)}
      >{children}</button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5">
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <button className="p-1 ml-auto bg-transparent text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>X</button>
                </div>
                <div className="relative p-4 flex-auto">{content}</div>
                <div className="flex items-center justify-end p-4">
                  <button
                    className="underline text-gray-400 py-0.5 px-4 m-1"
                    onClick={() => setShowModal(false)}
                  >Cancel</button>
                  <button
                    className="orange-solid-button px-8"
                    type="button"
                    onClick={() => submitAndClose(submit)}
                  >Select</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}


export default Modal; 