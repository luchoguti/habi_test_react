import {Modal, ModalClose, ModalContent} from "../../styles_components/ModalStyles";
import SummarySteps from "../Summary/SummarySteps";
import React from "react";

const SummaryModal = (props) => {
    return (
        <Modal
            {...props.open ? {open_modal: true} : {close_modal: true}}
        >
            <ModalContent>
                <ModalClose onClick={()=>{
                    props.setOpenStateModal(!props.open);
                }}>&times;</ModalClose>
                <SummarySteps home={false} modal={true}  display={true}/>
            </ModalContent>
        </Modal>
    )
}
export default SummaryModal;