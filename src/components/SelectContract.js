import { useEffect, useState } from "react";
import { createContract } from "../util/contract";
import contracts from "../assets/contracts.json";
import "../styles/selectcontract.scss";

function search(address) {
	const info = contracts.find(o => address === o.alias);
	return info ? info.address : address;
}

export default function SelectContract({ address, setError, setContract }) {

	const [ loading, setLoading ] = useState(false);

	const [ dropdownOpen, setDropdownOpen ] = useState(false);

	const [ logo, setLogo ] = useState(null);

	const open = () => setDropdownOpen(true);
	const close = () => setDropdownOpen(false);

	async function handleCreateContract(address) {
		try {
			// check whether it is a well known contract
			const info = contracts.find(o => address === o.address) || { address, alias: address };
			const contract = window.contract = await createContract(address, info.chain);
			// init balances before starting
			await Promise.all([
				contract.updateBalance(),
				contract.updateMin(),
				contract.updateMax()
			]);
			return [ contract, info ];
		} catch(e) {
			setError(e.message || "Could not load contract");
			return [];
		}
	}

	async function select(address) {
		setError(null);
		setContract(null);
		setLoading(true);
		close();
		const [ contract, info ] = await handleCreateContract(address);
		if(contract) {
			const res = setContract(contract, info);
			if(res instanceof Promise) {
				await res;
			}
			setLogo(info.logo);
		} else {
			setLogo(null);
		}
		setLoading(false);
	}

	function submit(event) {
		event.preventDefault();
		select(new FormData(event.target).get("address"));
	}

	useEffect(() => {
		if(address) {
			select(search(address));
		}
	}, [address]);

	return <form className="row force-margin" onSubmit={submit}>
		<label htmlFor="input-contract" className="label">Contract</label>
		<div className="value group select-contract-wrapper" onFocus={open} onBlur={close}>
			<input id="input-contract" autoComplete="off" spellCheck={false} required disabled={loading} name="address" placeholder="Select a contract on a chain to start playing" defaultValue={address ? search(address) : ""}  />
			{logo && <div className="logo-hover" style={{backgroundImage: `url(${logo})`}} />}
			{dropdownOpen && <div className="dropdown">
				{contracts.map(({ name, address, logo }) => <div className="item" onMouseDown={() => select(address)}>
					<div className="logo">
						<img src={logo} alt={name} />
					</div>
					<div className="info">
						<div>{name}</div>
						<div className="address">{address}</div>
					</div>
				</div>)}
			</div>}
		</div>
	</form>

}
