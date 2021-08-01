import {useEffect, useState} from "react";
import { createContract } from "../util/contract";
import contracts from "../assets/contracts.json";

export default function ContractForm({ address, setError, setContract }) {

	const [ first, setFirst ] = useState(true);
	const [ loading, setLoading ] = useState(false);

	async function select(arg) {
		const address = arg.toLowerCase();
		setError(null);
		setContract(null);
		setLoading(true);
		const contract = await createContract(address);
		if(contract) {
			window.contract = contract;
			// init balances before starting
			await Promise.all([
				contract.updateBalance(),
				contract.updateMin(),
				contract.updateMax()
			]);
			setFirst(false);
			// check whether it is a well known contract
			const res = setContract(contract, contracts.find(o => address === o.address) || {address});
			if(res instanceof Promise) {
				await res;
			}
		} else {
			setFirst(true);
			setError("Could not load contract");
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
			select(address);
		}
	}, [address]);

	return <form className="row force-margin" onSubmit={submit}>
		<label className="label">Contract</label>
		<div className="value group">
			<input name="address" defaultValue={address || contracts[0].address} spellCheck={false} />
			<button type="submit" className={loading ? "loading" : ""} style={{width: "8rem"}}>{first ? "Use" : "Change"}</button>
		</div>
	</form>

}
