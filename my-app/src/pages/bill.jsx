import Compoment,{BillTable} from "../compoments"
import styled from "styled-components"


export default function BillPage(){
    return (
        <div className="max-w-xl mx-auto sm:w-10/12 p-5 h-screen">
            <BillTable></BillTable>
        </div>
    )
}