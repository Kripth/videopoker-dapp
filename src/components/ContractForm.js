import { useEffect, useState } from "react";
import { createContract } from "../util/contract";
import contracts from "../assets/contracts.json";

function search(address) {
	const info = contracts.find(o => address === o.search);
	return info ? info.address : address;
}

export default function ContractForm({ address, setError, setContract }) {

	const [ first, setFirst ] = useState(true);
	const [ loading, setLoading ] = useState(false);

	async function handleCreateContract(address) {
		try {
			// check whether it is a well known contract
			const info = contracts.find(o => address === o.address) || { address };
			const contract = window.contract = await createContract(address, info.chainId);
			// init balances before starting
			await Promise.all([
				contract.updateBalance(),
				contract.updateMin(),
				contract.updateMax()
			]);
			return [ contract, info ];
		} catch(e) {
			setFirst(true);
			setError(e.message || "Could not load contract");
			return [];
		}
	}

	async function select(address) {
		setError(null);
		setContract(null);
		setLoading(true);
		const [ contract, info ] = await handleCreateContract(address);
		if(contract) {
			setFirst(false);
			const res = setContract(contract, info);
			if(res instanceof Promise) {
				await res;
			}
		}
		setLoading(false);
	}

	function submit(event) {
		event.preventDefault();
		if(!first) {
			//TODO confirm change
		}
		select(new FormData(event.target).get("address"));
	}

	useEffect(() => {
		if(address) {
			select(search(address));
		}
	}, [address]);

	return <form className="row force-margin" onSubmit={submit}>
		<label htmlFor="input-contract" className="label">Contract</label>
		<div className="value group">
			<input id="input-contract" autoComplete="off" name="address" defaultValue={address ? search(address) : contracts[0].address} spellCheck={false} />
			<button type="submit" className={loading ? "loading" : ""} style={{width: "8rem"}}>{first ? "Use" : "Change"}</button>
		</div>
	</form>

}
