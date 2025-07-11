import { ethers } from "ethers";

export default function addMargin(v: ethers.BigNumber) {
    return v.add(v.div(10).mul(2));
}
