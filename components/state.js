import { proxy } from "valtio";

const state = proxy({
    singleTask:'',
    refresh:false
})

export default state;