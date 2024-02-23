"use client"

import { BigNumberish } from "ethers";
import { useState } from "react";

type SellPopupProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (price: BigNumberish) => {};
}

function SellPopup(props: SellPopupProps) {
	const { open, onClose, onSubmit } = props;
	const [price, setPrice] = useState(0);
	const handleSubmit = (e : React.FormEvent) => {
		e.preventDefault();
		onSubmit(price);
	}
	return (
		<>
			{
				open && (
					<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70">
						<div className="m-15 p-5 bg-white w-2/5 relative rounded-lg">
							<form onSubmit={handleSubmit}>
								<input type="number" value={price} onChange={(e)=>{setPrice(parseInt(e.target.value))}}/>
								<button onClick={onClose}>
									Close
								</button>
								<button type="submit">
									Sell
								</button>
							</form>
						</div>
					</div>
				)
			}
		</>
	)
}

export default SellPopup