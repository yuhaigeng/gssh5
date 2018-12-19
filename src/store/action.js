import { 
    getSystem
} from "../api/index.js";
import { 
    GET_SYSTEM    
} from "./mutation-types";


export default {
  async getSystemInfo({
    commit,
    state
  }) {
    let res = await getSystem();
    console.log(res)
    commit(GET_SYSTEM,res)
  },
}