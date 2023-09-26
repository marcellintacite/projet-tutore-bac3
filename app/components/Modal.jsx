import React from "react";

export default function Modal() {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Ajouter des données</h3>
        <p className="py-4">Press ESC key or click on ✕ button to close</p>
        <form className="flex gap-6">
          <div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  L'id de votre certificat (ex: 123456789)
                </span>
              </label>
              <select className="select select-bordered rounded-md">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </div>
          </div>
          <div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">What is your name?</span>
                <span className="label-text-alt">Top Right label</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                <span className="label-text-alt">Bottom Left label</span>
                <span className="label-text-alt">Bottom Right label</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
}
