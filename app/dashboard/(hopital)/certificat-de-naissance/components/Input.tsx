"use client";

type Props = {
  register: any;
  name: string;
  label: string;
  placeholder: string;
  type: "text" | string;
  value?: string;
};

const CustomInput = (props: Props) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        required
        className="input input-bordered rounded-md w-full "
        {...props.register(props.name, {
          required: "Ce champ est requis",
          minLength: 1,
        })}
        value={props.value}
      />
    </div>
  );
};

export default CustomInput;
