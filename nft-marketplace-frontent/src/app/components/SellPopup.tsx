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
	const [price, setPrice] = useState<BigNumberish>(0);
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(price);
	}
	return (
		<>
			{
				open && (
					<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 w-full h-full">
						<div className="p-5 bg-white w-2/5 relative rounded-lg m-auto top-1/2">
							<form onSubmit={handleSubmit} className="flex flex-col">
								<input type="number" value={price.toString()} onChange={(e) => { setPrice(parseInt(e.target.value)) }} className="border-2 border-gray-300 rounded-lg"/>
								<div className="flex flex-row relative mt-4 justify-end">
									<button onClick={onClose} className="px-4 border-2 rounded-lg border-gray-950">
										Close
									</button>
									<button type="submit" className="px-4 rounded-lg bg-gray-950 text-white ml-4">
										Sell
									</button>
								</div>
							</form>
						</div>
					</div>
				)
			}
		</>
	)
}

export default SellPopup