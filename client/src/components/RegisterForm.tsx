import { FC, useState } from "react";
import { register } from "../assets/fetchData";

const initialStateForm = {
  username: "",
  email: "",
  password: "",
  password2: "",
};

const RegisterForm: FC = (): JSX.Element => {
  const [dataForm, setDataForm] = useState(initialStateForm);
  const { username, email, password, password2 } = dataForm;

  const handleChange = (event) => {
    setDataForm({ ...dataForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === password2) {
      try {
        const userData = { username, email, password };
        const sendForm = await register(userData);
        const set = await setDataForm(initialStateForm);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Password do not match");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">User name</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="username"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            placeholder="Enter your name"
            value={username}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Repeat password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            name="password2"
            className="form-control"
            id="exampleInputPassword2"
            placeholder="Password2"
            value={password2}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
