import "../styles/error.scss";

export default function ErrorMessage({ error }) {
	return <div className="error-component">{ error }</div>
}
